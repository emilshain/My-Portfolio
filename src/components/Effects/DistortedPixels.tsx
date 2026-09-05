"use client";

import * as THREE from "three";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useVideoTexture } from "@react-three/drei";

const GRID_SIZE = 16; // Decreased for a more 'pixelated' distortion feel

const fragmentShader = `
  uniform float time;
  uniform sampler2D uTexture;
  uniform sampler2D uDataTexture;
  uniform vec4 resolution;
  uniform float uOpacity;
  uniform float uGrainStrength;
  varying vec2 vUv;

  // Dynamic, refined & cinematic high-frequency sine wave function for procedural film grain
  float proceduralGrain(vec2 uv, float t) {
    // Quantize time to 18 FPS for smooth, cinematic film grain motion rate (not too fast/frantic)
    float timeStep = floor(t * 18.0);
    float frameSeed1 = fract(sin(timeStep * 123.4567) * 43758.5453);
    float frameSeed2 = fract(cos(timeStep * 987.6543) * 23421.6312);

    // Refined grain scale (1.6) for natural specks (not too large/chunky)
    float grainScale = 1.6;
    vec2 p = floor((uv * resolution.xy) / grainScale) + vec2(frameSeed1 * 271.0, frameSeed2 * 417.0);

    // Multi-harmonic high-frequency spatial sine wave hashes
    float n1 = fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
    float n2 = fract(sin(dot(p, vec2(63.7264, 10.8732))) * 23421.6312);

    float grain = fract(n1 + n2);
    return grain;
  }

  void main() {
    vec2 uv = vUv;

    // Sample data texture and decode velocity
    vec4 dataSample = texture2D(uDataTexture, vUv);
    vec2 offset = dataSample.rg - 0.5;

    // Distort UVs - Reduced strength for a subtle feel
    vec2 distortedUv = uv - 0.05 * offset;

    vec4 color = texture2D(uTexture, distortedUv);

    // Calculate procedural grain using high-frequency sine wave function
    float grain = proceduralGrain(uv, time);

    // Gritty contrast transformation
    float centered = grain - 0.5;
    float grittyNoise = sign(centered) * pow(abs(centered), 0.85);

    // Apply gritty & noisy texture to video colors
    vec3 grittyColor = color.rgb + grittyNoise * uGrainStrength;
    grittyColor = clamp(grittyColor, 0.0, 1.0);

    gl_FragColor = vec4(grittyColor, color.a * uOpacity);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DistortionPlane = ({ imagePath, progressRef }: { imagePath: string; progressRef: { current: number } }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useVideoTexture(imagePath, { loop: false, muted: true, start: false });

  // Re-render once the video metadata is loaded so the cover-fit scale uses the real aspect ratio
  const [, setVideoReady] = useState(false);
  useEffect(() => {
    const video = texture.image as HTMLVideoElement;
    const onLoaded = () => {
      setVideoReady(true);
      // Pin a decoded first frame so the hero isn't black before the first scroll
      video.pause();
      video.currentTime = 0.001;
    };
    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      onLoaded();
      return;
    }
    video.addEventListener("loadedmetadata", onLoaded);
    return () => video.removeEventListener("loadedmetadata", onLoaded);
  }, [texture]);

  // Video aspect ratio (0 until metadata loads) with a sensible fallback
  const videoAspect = () => {
    const video = texture.image as HTMLVideoElement;
    return video?.videoWidth && video?.videoHeight ? video.videoWidth / video.videoHeight : 1.5;
  };
  const { size, viewport } = useThree();

  // Calculate proper scale to maintain aspect ratio (cover behavior)
  const imageAspect = videoAspect();
  const viewportAspect = viewport.width / viewport.height;

  let scaleX = viewport.width;
  let scaleY = viewport.height;

  if (viewportAspect > imageAspect) {
    // Viewport wider than image - fit to width
    scaleY = viewport.width / imageAspect;
  } else {
    // Image wider than viewport - fit to height
    scaleX = viewport.height * imageAspect;
  }

  // Data texture setup - Using UnsignedByteType for compatibility
  const { data, dataTexture } = useMemo(() => {
    const total = GRID_SIZE * GRID_SIZE;
    const data = new Uint8Array(total * 4);
    for (let i = 0; i < total; i++) {
      data[i * 4] = 128;     // 0.5 neutral
      data[i * 4 + 1] = 128; // 0.5 neutral
      data[i * 4 + 2] = 0;
      data[i * 4 + 3] = 255;
    }
    const dt = new THREE.DataTexture(data, GRID_SIZE, GRID_SIZE, THREE.RGBAFormat, THREE.UnsignedByteType);
    // Switch to NearestFilter for a more "pixel-distortion" feel, less "liquid"
    dt.magFilter = dt.minFilter = THREE.NearestFilter;
    return { data, dataTexture: dt };
  }, []);

  const rawVelocities = useMemo(() => new Float32Array(GRID_SIZE * GRID_SIZE * 2), []);
  const mouse = useRef({ x: 0, y: 0, prevX: 0, prevY: 0, vX: 0, vY: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
      mouse.current.vX = mouse.current.x - mouse.current.prevX;
      mouse.current.vY = mouse.current.y - mouse.current.prevY;
      mouse.current.prevX = mouse.current.x;
      mouse.current.prevY = mouse.current.y;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const uniforms = useMemo(() => ({
    time: { value: 0 },
    uTexture: { value: texture },
    uDataTexture: { value: dataTexture },
    uOpacity: { value: 1.0 }, // Full opacity for maximum clarity
    uGrainStrength: { value: 0.30 }, // Balanced gritty and noisy procedural grain
    resolution: { value: new THREE.Vector4() }
  }), [texture, dataTexture]);

  useFrame((state) => {
    if (!meshRef.current) return;

    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.time.value = state.clock.elapsedTime;

    const video = texture.image as HTMLVideoElement;
    const imageAspect = video?.videoWidth && video?.videoHeight ? video.videoWidth / video.videoHeight : 1;
    const viewportAspect = size.width / size.height;

    let a1 = 1, a2 = 1;

    // Cover behavior - fill the viewport while maintaining aspect ratio
    if (viewportAspect > imageAspect) {
      // Viewport is wider than image
      a1 = 1;
      a2 = viewportAspect / imageAspect;
    } else {
      // Image is wider than viewport
      a1 = imageAspect / viewportAspect;
      a2 = 1;
    }

    mat.uniforms.resolution.value.set(size.width, size.height, a1, a2);

    // Update DataTexture
    const relaxation = 0.90; // Faster decay to reduce "liquid" feel
    const strength = 0.3;    // Reduced strength
    const mouseRadius = 0.08; // Smaller radius for more focused distortion
    
    const gridMouseX = GRID_SIZE * mouse.current.x;
    const gridMouseY = GRID_SIZE * (1 - mouse.current.y);
    const maxDist = GRID_SIZE * mouseRadius;
    const aspect = size.height / size.width;

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        const indexRaw = (i + GRID_SIZE * j) * 2;
        const indexData = (i + GRID_SIZE * j) * 4;
        
        rawVelocities[indexRaw] *= relaxation;
        rawVelocities[indexRaw + 1] *= relaxation;

        const distance = Math.pow(gridMouseX - i, 2) / aspect + Math.pow(gridMouseY - j, 2);
        const dist = Math.sqrt(distance);

        if (dist < maxDist) {
          // Increased Feathering: Quadratic falloff for a much softer edge
          const normalizedDist = dist / maxDist;
          const power = Math.pow(1.0 - normalizedDist, 2.0); 
          
          rawVelocities[indexRaw] += strength * 150 * mouse.current.vX * power;
          rawVelocities[indexRaw + 1] -= strength * 150 * mouse.current.vY * power;
        }

        data[indexData] = Math.floor((Math.max(-0.5, Math.min(0.5, rawVelocities[indexRaw])) + 0.5) * 255);
        data[indexData + 1] = Math.floor((Math.max(-0.5, Math.min(0.5, rawVelocities[indexRaw + 1])) + 0.5) * 255);
      }
    }

    mouse.current.vX *= 0.8;
    mouse.current.vY *= 0.8;
    dataTexture.needsUpdate = true;

    // Scrub the video according to scroll progress
    if (video && video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA && Number.isFinite(video.duration) && video.duration > 0) {
      if (!video.paused) video.pause();
      const target = progressRef.current * video.duration;
      if (Math.abs(video.currentTime - target) > 0.005) {
        video.currentTime = target;
        texture.needsUpdate = true;
      }
    }
  });

  return (
    <mesh ref={meshRef} scale={[scaleX, scaleY, 1]}>
      <planeGeometry args={[1, 1, 1, 1]} />
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
      />
    </mesh>
  );
};

export const DistortedHeroBackground = ({ imagePath, progressRef }: { imagePath: string; progressRef: { current: number } }) => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 2], fov: 75 }}
        gl={{ antialias: false, alpha: true }}
        onCreated={({ gl }) => {
           gl.setClearColor(new THREE.Color("#050505"), 1); // Restored dark background
        }}
        dpr={[1, 2]}
      >
        <React.Suspense fallback={null}>
          <DistortionPlane imagePath={imagePath} progressRef={progressRef} />
        </React.Suspense>
      </Canvas>

    </div>
  );
};

export const ProceduralGrainCanvas = ({ grainStrength = 0.30 }: { grainStrength?: number }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = Math.ceil(window.innerWidth / 2);
      canvas.height = Math.ceil(window.innerHeight / 2);
    };
    resize();
    window.addEventListener("resize", resize);

    const render = () => {
      time += 0.016;
      const width = canvas.width;
      const height = canvas.height;
      if (width === 0 || height === 0) return;
      const imgData = ctx.createImageData(width, height);
      const data = imgData.data;

      // Quantize time to 18 FPS for natural cinematic film grain motion rate
      const timeStep = Math.floor(time * 18.0);
      const grainScale = 1.6;

      const frameSeed1 = Math.abs(Math.sin(timeStep * 123.4567) * 43758.5453) % 1;
      const frameSeed2 = Math.abs(Math.cos(timeStep * 987.6543) * 23421.6312) % 1;
      const offsetX = frameSeed1 * 271.0;
      const offsetY = frameSeed2 * 417.0;

      // High-frequency sine wave function loop
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const idx = (y * width + x) * 4;
          const px = Math.floor(x / grainScale) + offsetX;
          const py = Math.floor(y / grainScale) + offsetY;

          const n1 = Math.abs(Math.sin(px * 12.9898 + py * 78.233) * 43758.5453) % 1;
          const n2 = Math.abs(Math.sin(px * 63.7264 + py * 10.8732) * 23421.6312) % 1;
          let grain = (n1 + n2) % 1;

          const centered = grain - 0.5;
          const grittyNoise = Math.sign(centered) * Math.pow(Math.abs(centered), 0.85);

          const noiseVal = grittyNoise * 255 * grainStrength;

          data[idx] = Math.min(255, Math.max(0, 128 + noiseVal));
          data[idx + 1] = Math.min(255, Math.max(0, 128 + noiseVal));
          data[idx + 2] = Math.min(255, Math.max(0, 128 + noiseVal));
          data[idx + 3] = 65; // Balanced overlay opacity
        }
      }

      ctx.putImageData(imgData, 0, 0);
      animFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animFrameId);
    };
  }, [grainStrength]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay opacity-80 z-10"
    />
  );
};


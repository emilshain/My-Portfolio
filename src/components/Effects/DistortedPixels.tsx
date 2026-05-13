"use client";

import * as THREE from "three";
import React, { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const GRID_SIZE = 16; // Decreased for a more 'pixelated' distortion feel

const fragmentShader = `
  uniform float time;
  uniform sampler2D uTexture;
  uniform sampler2D uDataTexture;
  uniform vec4 resolution;
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    // Aspect ratio correction (cover)
    vec2 newUv = (vUv - vec2(0.5)) * resolution.zw + vec2(0.5);
    
    // Sample data texture and decode velocity
    vec4 dataSample = texture2D(uDataTexture, vUv);
    vec2 offset = dataSample.rg - 0.5;
    
    // Distort UVs - Reduced strength for a subtle feel
    vec2 distortedUv = newUv - 0.05 * offset;
    
    vec4 color = texture2D(uTexture, distortedUv);
    gl_FragColor = vec4(color.rgb, color.a * uOpacity);
  }
`;

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DistortionPlane = ({ imagePath }: { imagePath: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const texture = useTexture(imagePath);
  const { size, viewport } = useThree();
  
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
    uOpacity: { value: 0.8 }, // Restored premium opacity
    resolution: { value: new THREE.Vector4() }
  }), [texture, dataTexture]);

  useFrame((state) => {
    if (!meshRef.current) return;
    
    const mat = meshRef.current.material as THREE.ShaderMaterial;
    mat.uniforms.time.value = state.clock.elapsedTime;
    
    const imageAspect = texture.image ? texture.image.width / texture.image.height : 1.5;
    let a1, a2;
    if (size.height / size.width > 1 / imageAspect) {
      a1 = (size.width / size.height) * imageAspect;
      a2 = 1;
    } else {
      a1 = 1;
      a2 = (size.height / size.width) / (1 / imageAspect);
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
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
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

export const DistortedHeroBackground = ({ imagePath }: { imagePath: string }) => {
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
          <DistortionPlane imagePath={imagePath} />
        </React.Suspense>
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505] pointer-events-none" />
    </div>
  );
};

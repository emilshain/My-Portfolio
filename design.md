# Design System & Aesthetic Guidelines

## Overview
The Emil Shain Portfolio is designed with a **"Dark Minimalist & Immersive"** aesthetic. It focuses on high-contrast typography, subtle glassmorphism, and interactive 3D elements to create a premium, state-of-the-art feel.

## Color Palette
The project uses a deep, high-contrast palette with a single primary accent color.

| Color | Hex | Role |
| :--- | :--- | :--- |
| **Background** | `#050505` | Primary layout background |
| **Foreground** | `#ededed` | Primary text and light elements |
| **Accent** | `#f74507` | Interaction highlights, links, and branding (Vibrant Orange-Red) |
| **Muted** | `rgba(255, 255, 255, 0.4)` | Secondary text, borders, and UI skeletons |

## Typography
- **Primary Sans**: `Geist Sans` (Inter fallback) - Used for headings and body text.
- **Monospace**: `Geist Mono` - Used for technical labels, numbers, and "Hello" tags.
- **Headings**: Large `tracking-tight` tracking with `text-gradient` utility.
- **Font Features**: Uses `cv11` and `ss01` for modern character alternates.

## Visual Language
### Glassmorphism
Elements like cards and skill tags use the `.glass` utility:
- **Background**: `white/5` (5% opacity white)
- **Blur**: `backdrop-blur-xl`
- **Border**: `1px solid white/10`

### Gradients
- **Text Gradient**: A subtle linear gradient from `white` to `white/40` at `bottom-right` for a metallic/reflective effect.
- **Selection**: `blue-500/30` background for text selection.

### Interaction & Motion
- **Animations**: Powered by **Framer Motion**.
  - **Fade-In-Up**: Default entry animation for sections (`opacity: 0, y: 50` to `opacity: 1, y: 0`).
  - **Smooth Hover**: Cards lift on hover (`y: -10`) and transition background colors.
- **Cursor**: A custom reactive cursor that interacts with links and interactive elements.
- **3D Interaction**: Integrated **React Three Fiber** scene providing depth and environmental context to the UI.

## Components
- **Section**: Standardized full-screen (`h-screen`) flex container with centered padding.
- **Glass Card**: Rounded (`rounded-3xl`) containers with glass effects for project showcases.
- **Skill Badge**: Small, rounded pills for technology stacks.

## Future Plans
- Implementation of a more complex shader-based background.
- Enhanced staggered loading animations for grid items.
- Dynamic color shifts based on scroll position or 3D scene events.

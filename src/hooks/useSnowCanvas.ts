// ─────────────────────────────────────────────
// useSnowCanvas — FR-04: Immersive Snow Canvas
// 60 FPS via requestAnimationFrame
// Auto-pause when tab is hidden (document.hidden)
// Desktop: 50–80 particles | Mobile: 25 particles
// ─────────────────────────────────────────────
import { useEffect, useRef } from 'react';

interface Snowflake {
  x: number;
  y: number;
  radius: number;
  velocityY: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftOffset: number;
  opacity: number;
}

function createSnowflake(canvasWidth: number, canvasHeight: number): Snowflake {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight - canvasHeight, // start above canvas
    radius: 1 + Math.random() * 2.5,              // 1px – 3.5px
    velocityY: 0.5 + Math.random() * 1.5,         // 0.5 – 2.0 px/frame
    driftAmplitude: 0.3 + Math.random() * 0.7,   // sin drift strength
    driftFrequency: 0.005 + Math.random() * 0.01,
    driftOffset: Math.random() * Math.PI * 2,
    opacity: 0.3 + Math.random() * 0.55,          // 0.3 – 0.85
  };
}

interface UseSnowCanvasOptions {
  isActive: boolean;
}

export function useSnowCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { isActive }: UseSnowCanvasOptions,
) {
  const animationIdRef = useRef<number | null>(null);
  const snowflakesRef = useRef<Snowflake[]>([]);
  const frameCountRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine particle count based on screen width (DEC-04)
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 60 + Math.floor(Math.random() * 20); // 60–80 on desktop

    // Resize handler — keep canvas full-window
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initialize snowflakes spread across the full canvas height (natural start)
    snowflakesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const flake = createSnowflake(canvas.width, canvas.height);
      flake.y = Math.random() * canvas.height; // scatter on first load
      return flake;
    });

    // ─── Animation Loop ───────────────────────
    const animate = () => {
      // Pause when tab is hidden (FR-04: tiết kiệm CPU)
      if (document.hidden) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isActive) {
        // Clear canvas and stop drawing — keep RAF alive so resume is instant
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      frameCountRef.current += 1;

      snowflakesRef.current.forEach((flake) => {
        // Update position
        flake.y += flake.velocityY;
        flake.x +=
          Math.sin(frameCountRef.current * flake.driftFrequency + flake.driftOffset) *
          flake.driftAmplitude;

        // Reset snowflake when it exits bottom of canvas
        if (flake.y > canvas.height + flake.radius) {
          Object.assign(flake, createSnowflake(canvas.width, canvas.height));
          flake.y = -flake.radius; // re-enter from top
        }

        // Draw snowflake
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(248, 250, 252, ${flake.opacity})`; // --color-text-snow
        ctx.fill();
      });

      animationIdRef.current = requestAnimationFrame(animate);
    };

    animationIdRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationIdRef.current !== null) {
        cancelAnimationFrame(animationIdRef.current);
      }
    };
  }, [canvasRef, isActive]);
}

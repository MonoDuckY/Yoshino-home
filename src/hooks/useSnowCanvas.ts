// useSnowCanvas — FR-04: Immersive Snow Canvas
// DEC-09: Soft blue particles on light "Warm Winter" background
// 60 FPS via requestAnimationFrame | auto-pause on document.hidden
// Desktop: 50–80 particles | Mobile: 25 particles (DEC-04)
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
    y: Math.random() * canvasHeight - canvasHeight,
    radius: 1 + Math.random() * 2.5,            // 1px – 3.5px
    velocityY: 0.4 + Math.random() * 1.4,       // 0.4 – 1.8 px/frame
    driftAmplitude: 0.3 + Math.random() * 0.6,
    driftFrequency: 0.005 + Math.random() * 0.01,
    driftOffset: Math.random() * Math.PI * 2,
    opacity: 0.25 + Math.random() * 0.45,       // 0.25 – 0.70 (softer on light bg)
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

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 25 : 55 + Math.floor(Math.random() * 20); // 55–75 desktop

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Scatter flakes across full canvas on first load
    snowflakesRef.current = Array.from({ length: PARTICLE_COUNT }, () => {
      const flake = createSnowflake(canvas.width, canvas.height);
      flake.y = Math.random() * canvas.height;
      return flake;
    });

    const animate = () => {
      if (document.hidden) {
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      if (!isActive) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        animationIdRef.current = requestAnimationFrame(animate);
        return;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frameCountRef.current += 1;

      snowflakesRef.current.forEach((flake) => {
        flake.y += flake.velocityY;
        flake.x +=
          Math.sin(frameCountRef.current * flake.driftFrequency + flake.driftOffset) *
          flake.driftAmplitude;

        if (flake.y > canvas.height + flake.radius) {
          Object.assign(flake, createSnowflake(canvas.width, canvas.height));
          flake.y = -flake.radius;
        }

        // DEC-09: Soft cornflower-blue snowflakes on light bg
        ctx.beginPath();
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 160, 220, ${flake.opacity})`;
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

// useSnowCanvas — FR-04: Immersive Crystalline Snowflake Canvas (DEC-25)
// Realistic 6-pointed ice crystals (Dendrite, Stellar Star & Soft Bokeh)
// 60 FPS via Offscreen Canvas Sprite Caching | 3D Depth Layering & Natural Flutter
import { useEffect, useRef } from 'react';

// ── Offscreen Sprite Caching for 60 FPS GPU-accelerated rendering ──
function createDendriteSprite(size = 96): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  // Outer Ice-Glow Shadow
  ctx.shadowColor = 'rgba(56, 189, 248, 0.85)';
  ctx.shadowBlur = Math.max(3, size * 0.08);

  ctx.strokeStyle = 'rgba(45, 125, 205, 0.92)';
  ctx.lineWidth = Math.max(2.0, size * 0.046);
  ctx.lineCap = 'round';

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Main spine
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * cos, cy + r * sin);
    ctx.stroke();

    // 1st pair of chevron branches (50% radius)
    const b1Dist = r * 0.5;
    const b1Len = r * 0.32;
    const b1x = cx + b1Dist * cos;
    const b1y = cy + b1Dist * sin;
    const bAngle1 = angle + Math.PI / 4;
    const bAngle2 = angle - Math.PI / 4;

    ctx.beginPath();
    ctx.moveTo(b1x, b1y);
    ctx.lineTo(b1x + b1Len * Math.cos(bAngle1), b1y + b1Len * Math.sin(bAngle1));
    ctx.moveTo(b1x, b1y);
    ctx.lineTo(b1x + b1Len * Math.cos(bAngle2), b1y + b1Len * Math.sin(bAngle2));
    ctx.stroke();

    // 2nd pair of chevron branches (78% radius)
    const b2Dist = r * 0.78;
    const b2Len = r * 0.22;
    const b2x = cx + b2Dist * cos;
    const b2y = cy + b2Dist * sin;

    ctx.beginPath();
    ctx.moveTo(b2x, b2y);
    ctx.lineTo(b2x + b2Len * Math.cos(bAngle1), b2y + b2Len * Math.sin(bAngle1));
    ctx.moveTo(b2x, b2y);
    ctx.lineTo(b2x + b2Len * Math.cos(bAngle2), b2y + b2Len * Math.sin(bAngle2));
    ctx.stroke();

    // Branch tip crystal bead
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.beginPath();
    ctx.arc(cx + r * cos, cy + r * sin, Math.max(1.6, size * 0.04), 0, Math.PI * 2);
    ctx.fill();
  }

  // Inner hexagonal star core
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.beginPath();
  ctx.arc(cx, cy, Math.max(2, size * 0.07), 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

function createStarSprite(size = 96): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  ctx.shadowColor = 'rgba(125, 211, 252, 0.85)';
  ctx.shadowBlur = Math.max(3, size * 0.08);

  ctx.strokeStyle = 'rgba(50, 130, 210, 0.90)';
  ctx.lineWidth = Math.max(2.0, size * 0.048);
  ctx.lineCap = 'round';

  for (let i = 0; i < 6; i++) {
    const angle = (i * Math.PI) / 3;
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    // Spine
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + r * cos, cy + r * sin);
    ctx.stroke();

    // Diamond arrowhead tip
    const tipX = cx + r * cos;
    const tipY = cy + r * sin;
    const diamondR = r * 0.22;
    const normalA = angle + Math.PI / 2;

    ctx.fillStyle = 'rgba(240, 249, 255, 0.95)';
    ctx.beginPath();
    ctx.moveTo(tipX, tipY);
    ctx.lineTo(
      tipX - diamondR * cos + diamondR * 0.45 * Math.cos(normalA),
      tipY - diamondR * sin + diamondR * 0.45 * Math.sin(normalA),
    );
    ctx.lineTo(tipX - diamondR * 1.25 * cos, tipY - diamondR * 1.25 * sin);
    ctx.lineTo(
      tipX - diamondR * cos - diamondR * 0.45 * Math.cos(normalA),
      tipY - diamondR * sin - diamondR * 0.45 * Math.sin(normalA),
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  // Delicate center ring
  ctx.strokeStyle = 'rgba(125, 211, 252, 0.95)';
  ctx.lineWidth = Math.max(1.4, size * 0.035);
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.26, 0, Math.PI * 2);
  ctx.stroke();

  ctx.fillStyle = 'rgba(255, 255, 255, 0.98)';
  ctx.beginPath();
  ctx.arc(cx, cy, r * 0.1, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

function createBokehSprite(size = 48): HTMLCanvasElement {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return canvas;

  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.35, 'rgba(125, 211, 252, 0.7)');
  gradient.addColorStop(1, 'rgba(59, 157, 210, 0)');

  ctx.fillStyle = gradient;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fill();

  return canvas;
}

interface SnowflakeParticle {
  x: number;
  y: number;
  size: number;
  velocityY: number;
  driftAmplitude: number;
  driftFrequency: number;
  driftOffset: number;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
  spriteIndex: number; // 0: Dendrite, 1: Star, 2: Bokeh
}

export type SnowLayer = 'background' | 'foreground';

function createParticle(
  canvasWidth: number,
  canvasHeight: number,
  isInitial = false,
  layer: SnowLayer = 'background',
): SnowflakeParticle {
  let spriteIndex: number;
  let size: number;
  let velocityY: number;
  let rotationSpeed: number;
  let opacity: number;

  if (layer === 'foreground') {
    // FOREGROUND LAYER: Crisp, prominent 6-pointed crystals passing in front of cards & standee
    const isDendrite = Math.random() < 0.6;
    spriteIndex = isDendrite ? 0 : 1;
    size = 20 + Math.random() * 12; // 20px – 32px
    velocityY = 0.45 + Math.random() * 0.65; // Slow, dreamy float
    rotationSpeed = (Math.random() - 0.5) * 0.012;
    opacity = 0.75 + Math.random() * 0.2; // High clarity and contrast
  } else {
    // BACKGROUND LAYER: Drifts behind page content, visible through translucent frosted glass
    const rand = Math.random();
    if (rand < 0.3) {
      // Large intricate Dendrite
      spriteIndex = 0;
      size = 18 + Math.random() * 8; // 18px – 26px
      velocityY = 0.5 + Math.random() * 0.8;
      rotationSpeed = (Math.random() - 0.5) * 0.015;
      opacity = 0.7 + Math.random() * 0.25;
    } else if (rand < 0.7) {
      // Medium crystalline Star
      spriteIndex = 1;
      size = 12 + Math.random() * 7; // 12px – 19px
      velocityY = 0.6 + Math.random() * 1.0;
      rotationSpeed = (Math.random() - 0.5) * 0.024;
      opacity = 0.6 + Math.random() * 0.3;
    } else {
      // Soft glowing ice dust / bokeh
      spriteIndex = 2;
      size = 5 + Math.random() * 5; // 5px – 10px
      velocityY = 0.35 + Math.random() * 0.65;
      rotationSpeed = 0;
      opacity = 0.4 + Math.random() * 0.3;
    }
  }

  return {
    x: Math.random() * canvasWidth,
    y: isInitial ? Math.random() * canvasHeight : -size - Math.random() * 20,
    size,
    velocityY,
    driftAmplitude: 0.4 + Math.random() * 0.9,
    driftFrequency: 0.006 + Math.random() * 0.012,
    driftOffset: Math.random() * Math.PI * 2,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed,
    opacity,
    spriteIndex,
  };
}

interface UseSnowCanvasOptions {
  isActive: boolean;
  layer?: SnowLayer;
}

export function useSnowCanvas(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  { isActive, layer = 'background' }: UseSnowCanvasOptions,
) {
  const animationIdRef = useRef<number | null>(null);
  const particlesRef = useRef<SnowflakeParticle[]>([]);
  const frameCountRef = useRef(0);
  const spritesRef = useRef<HTMLCanvasElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Cache offscreen sprites once
    if (spritesRef.current.length === 0) {
      spritesRef.current = [createDendriteSprite(96), createStarSprite(96), createBokehSprite(48)];
    }

    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT =
      layer === 'foreground'
        ? (isMobile ? 8 : 18) // Curated foreground layer
        : (isMobile ? 32 : 65); // Atmospheric background layer

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    // Initial particle seeding across the canvas
    particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () =>
      createParticle(canvas.width, canvas.height, true, layer),
    );

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

      const sprites = spritesRef.current;

      particlesRef.current.forEach((flake) => {
        flake.y += flake.velocityY;
        flake.rotation += flake.rotationSpeed;
        flake.x +=
          Math.sin(frameCountRef.current * flake.driftFrequency + flake.driftOffset) *
          flake.driftAmplitude;

        // Wrap around when falling past bottom edge
        if (flake.y > canvas.height + flake.size) {
          Object.assign(flake, createParticle(canvas.width, canvas.height, false, layer));
        }

        const sprite = sprites[flake.spriteIndex];
        if (!sprite) return;

        // Fast GPU-accelerated drawImage with rotation & opacity
        ctx.save();
        ctx.translate(flake.x, flake.y);
        if (flake.rotationSpeed !== 0) {
          ctx.rotate(flake.rotation);
        }
        ctx.globalAlpha = flake.opacity;
        ctx.drawImage(
          sprite,
          -flake.size / 2,
          -flake.size / 2,
          flake.size,
          flake.size,
        );
        ctx.restore();
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
  }, [canvasRef, isActive, layer]);
}

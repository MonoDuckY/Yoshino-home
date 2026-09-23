// ─────────────────────────────────────────────
// SnowCanvas — Full-viewport snow particle layer
// Supports True 3D Spatial Depth (Background & Foreground layering)
// ─────────────────────────────────────────────
import { useRef } from 'react';
import { useSnowCanvas, type SnowLayer } from '../../hooks/useSnowCanvas';

interface SnowCanvasProps {
  isActive: boolean;
  layer?: SnowLayer;
}

export function SnowCanvas({ isActive, layer = 'background' }: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSnowCanvas(canvasRef, { isActive, layer });

  // Foreground snow sits in front of standee/cards (z-20), background snow sits behind content (z-0)
  const zIndex = layer === 'foreground' ? 20 : 0;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex }}
    />
  );
}

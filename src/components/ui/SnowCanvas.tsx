// ─────────────────────────────────────────────
// SnowCanvas — Full-viewport snow particle layer
// Sits behind all content via z-index
// ─────────────────────────────────────────────
import { useRef } from 'react';
import { useSnowCanvas } from '../../hooks/useSnowCanvas';

interface SnowCanvasProps {
  isActive: boolean;
}

export function SnowCanvas({ isActive }: SnowCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useSnowCanvas(canvasRef, { isActive });

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

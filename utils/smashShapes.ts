import { useEffect, useLayoutEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export type SmashShapeVariant =
  | 'card'
  | 'photo'
  | 'square'
  | 'btn'
  | 'compact'
  | 'badge'
  | 'wide';

export type SmashStrokeMode = 'none' | 'thin' | 'card';

const clamp = (val: number, min: number, max: number) =>
  Math.max(min, Math.min(max, val));

interface ShapeParams {
  r: number;
  bowX: number;
  bowY: number;
  strokeWidth: number;
}

function getShapeParams(
  w: number,
  h: number,
  variant: SmashShapeVariant,
  strokeMode?: SmashStrokeMode
): ShapeParams {
  const minDim = Math.min(w, h);
  let r: number;
  let bowX: number;
  let bowY: number;
  let strokeWidth: number;

  switch (variant) {
    case 'card':
      r = clamp(minDim * 0.145, 16, 54);
      bowX = clamp(h * 0.012, 1.4, 3.5);
      bowY = clamp(w * 0.012, 1.4, 3.5);
      strokeWidth = 2.4;
      break;
    case 'photo':
      r = clamp(minDim * 0.125, 14, 32);
      bowX = clamp(h * 0.01, 1.0, 2.6);
      bowY = clamp(w * 0.01, 1.0, 2.6);
      strokeWidth = 2;
      break;
    case 'square':
      r = clamp(minDim * 0.23, 8, 16);
      bowX = clamp(h * 0.018, 0.8, 1.8);
      bowY = clamp(w * 0.018, 0.8, 1.8);
      strokeWidth = 2;
      break;
    case 'compact':
      r = clamp(Math.min(h * 0.28, w * 0.16), 9, 14);
      bowX = clamp(h * 0.018, 0.6, 1.4);
      bowY = clamp(minDim * 0.016, 0.6, 1.4);
      strokeWidth = 2;
      break;
    case 'badge':
      r = clamp(Math.min(h * 0.32, w * 0.18), 7, 11);
      bowX = clamp(h * 0.018, 0.4, 1.0);
      bowY = clamp(minDim * 0.016, 0.5, 1.0);
      strokeWidth = 0;
      break;
    case 'wide':
      r = clamp(Math.min(h * 0.24, w * 0.09), 12, 22);
      bowX = clamp(h * 0.014, 0.8, 2.2);
      bowY = clamp(minDim * 0.014, 1.0, 2.5);
      strokeWidth = 2;
      break;
    case 'btn':
    default:
      r = clamp(Math.min(h * 0.3, w * 0.18), 10, 16);
      bowX = clamp(h * 0.02, 0.6, 1.5);
      bowY = clamp(minDim * 0.018, 0.7, 1.6);
      strokeWidth = 2;
      break;
  }

  if (strokeMode === 'none') {
    strokeWidth = 0;
  } else if (strokeMode === 'thin') {
    strokeWidth = 2;
  } else if (strokeMode === 'card') {
    strokeWidth = 2.4;
  }

  // Hard safety guard so curves never overlap even on tiny elements
  r = Math.min(r, minDim * 0.33);
  return { r, bowX, bowY, strokeWidth };
}

const f = (n: number) => n.toFixed(2);

function buildSquirclePath(w: number, h: number, params: ShapeParams): string {
  const { r, bowX, bowY } = params;
  const hw = w / 2;
  const hh = h / 2;
  const tx = (hw - r) * 0.53;
  const ty = (hh - r) * 0.53;
  const edgeR = Math.min(r * 1.3, hw * 0.92);
  const edgeRy = Math.min(r * 1.3, hh * 0.92);

  return [
    `M ${f(hw)},0`,
    `C ${f(hw + tx)},0 ${f(w - edgeR)},${f(bowY * 0.3)} ${f(w - r)},${f(bowY)}`,
    `C ${f(w - r * 0.35)},${f(bowY + r * 0.075)} ${f(w - bowX - r * 0.075)},${f(r * 0.35)} ${f(w - bowX)},${f(r)}`,
    `C ${f(w - bowX * 0.3)},${f(edgeRy)} ${w},${f(hh - ty)} ${w},${f(hh)}`,
    `C ${w},${f(hh + ty)} ${f(w - bowX * 0.3)},${f(h - edgeRy)} ${f(w - bowX)},${f(h - r)}`,
    `C ${f(w - bowX - r * 0.075)},${f(h - r * 0.35)} ${f(w - r * 0.35)},${f(h - bowY - r * 0.075)} ${f(w - r)},${f(h - bowY)}`,
    `C ${f(w - edgeR)},${f(h - bowY * 0.3)} ${f(hw + tx)},${h} ${f(hw)},${h}`,
    `C ${f(hw - tx)},${h} ${f(edgeR)},${f(h - bowY * 0.3)} ${f(r)},${f(h - bowY)}`,
    `C ${f(r * 0.35)},${f(h - bowY - r * 0.075)} ${f(bowX + r * 0.075)},${f(h - r * 0.35)} ${f(bowX)},${f(h - r)}`,
    `C ${f(bowX * 0.3)},${f(h - edgeRy)} 0,${f(hh + ty)} 0,${f(hh)}`,
    `C 0,${f(hh - ty)} ${f(bowX * 0.3)},${f(edgeRy)} ${f(bowX)},${f(r)}`,
    `C ${f(bowX + r * 0.075)},${f(r * 0.35)} ${f(r * 0.35)},${f(bowY + r * 0.075)} ${f(r)},${f(bowY)}`,
    `C ${f(edgeR)},${f(bowY * 0.3)} ${f(hw - tx)},0 ${f(hw)},0 Z`,
  ].join(' ');
}

function applySquircleToElement(el: HTMLElement) {
  const variant = (el.dataset.smashShape as SmashShapeVariant) || 'btn';
  const strokeMode = el.dataset.smashStroke as SmashStrokeMode | undefined;
  const w = el.offsetWidth;
  const h = el.offsetHeight;
  if (w < 8 || h < 8) return;

  const prevW = Number(el.dataset.smashPrevW || 0);
  const prevH = Number(el.dataset.smashPrevH || 0);
  const prevStroke = el.dataset.smashPrevStroke || '';
  const currStroke = strokeMode || 'default';
  if (
    Math.abs(w - prevW) < 0.5 &&
    Math.abs(h - prevH) < 0.5 &&
    prevStroke === currStroke
  ) {
    return;
  }

  el.dataset.smashPrevW = String(w);
  el.dataset.smashPrevH = String(h);
  el.dataset.smashPrevStroke = currStroke;

  const params = getShapeParams(w, h, variant, strokeMode);
  const d = buildSquirclePath(w, h, params);

  el.style.clipPath = `path('${d}')`;
  if (params.strokeWidth <= 0) {
    el.style.setProperty('--smash-border-img', 'none');
  } else {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" preserveAspectRatio="none"><path fill="none" stroke="#432724" stroke-width="${params.strokeWidth}" d="${d}"/></svg>`;
    el.style.setProperty('--smash-border-img', `url("data:image/svg+xml,${encodeURIComponent(svg)}")`);
  }
}

export function useSmashShapes(deps: unknown[] = []) {
  useIsomorphicLayoutEffect(() => {
    let active = true;
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>('[data-smash-shape]')
    );
    if (elements.length === 0) return;

    elements.forEach(applySquircleToElement);

    if (typeof document !== 'undefined' && document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (active) {
          elements.forEach(applySquircleToElement);
        }
      });
    }

    if (typeof ResizeObserver === 'undefined') {
      return () => {
        active = false;
      };
    }
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target instanceof HTMLElement) {
          applySquircleToElement(entry.target);
        }
      }
    });

    elements.forEach((el) => observer.observe(el));
    return () => {
      active = false;
      observer.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}

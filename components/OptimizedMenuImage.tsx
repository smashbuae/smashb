import React from 'react';
import { getMenuImageSources } from '../data/menuData';

interface OptimizedMenuImageProps {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export const OptimizedMenuImage: React.FC<OptimizedMenuImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  sizes = '(max-width: 640px) 80vw, (max-width: 1024px) 42vw, 320px',
  priority = false,
}) => {
  const { webp320, webpFull, fallbackPng } = getMenuImageSources(src);
  const fullW = width;
  const smallW = Math.min(320, fullW);

  return (
    <picture className="w-full h-full flex items-center justify-center">
      <source
        type="image/webp"
        srcSet={`${webp320} ${smallW}w, ${webpFull} ${fullW}w`}
        sizes={sizes}
      />
      <img
        src={fallbackPng}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        className={className}
      />
    </picture>
  );
};

export default OptimizedMenuImage;

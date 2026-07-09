import React from 'react';
import { FiStar } from 'react-icons/fi';
import { cn } from '../../utils/cn';

interface RatingProps {
  value: number;
  max?: number;
  size?: number;
  className?: string;
}

export const Rating: React.FC<RatingProps> = ({ value, max = 5, size = 16, className }) => (
  <div className={cn('flex items-center gap-0.5', className)}>
    {Array.from({ length: max }).map((_, i) => (
      <FiStar
        key={i}
        size={size}
        className={i < Math.round(value) ? 'text-accent fill-accent' : 'text-gray-300'}
        style={{ fill: i < Math.round(value) ? '#A3E635' : 'none' }}
      />
    ))}
  </div>
);

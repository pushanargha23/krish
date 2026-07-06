import React from 'react';

interface SkeletonProps {
  className?: string;
  count?: number;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '', count = 1 }) => (
  <>
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className={`skeleton ${className}`} />
    ))}
  </>
);

export const PropertyCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-card">
    <Skeleton className="h-56 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-4 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-4 w-full" />
      <div className="flex gap-3 pt-2">
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-8 w-20" />
      </div>
    </div>
  </div>
);

export const BlogCardSkeleton: React.FC = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-card">
    <Skeleton className="h-48 w-full rounded-none" />
    <div className="p-5 space-y-3">
      <Skeleton className="h-3 w-1/4" />
      <Skeleton className="h-5 w-full" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  </div>
);

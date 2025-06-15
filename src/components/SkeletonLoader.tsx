
import { Skeleton } from './ui/skeleton';

interface ArtworkGridSkeletonProps {
  count?: number;
  columns?: 1 | 2 | 3 | 4;
}

export const ArtworkGridSkeleton = ({ count = 6, columns = 2 }: ArtworkGridSkeletonProps) => {
  return (
    <div className={`grid gap-4 ${
      columns === 1 ? 'grid-cols-1' :
      columns === 2 ? 'grid-cols-2' :
      columns === 3 ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
      'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
    }`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Skeleton className="w-full h-48" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const FeaturedWorksSkeleton = () => {
  return (
    <div className="flex gap-4 overflow-x-auto pb-4">
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="flex-shrink-0 w-64 bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <Skeleton className="w-full h-48" />
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
            <Skeleton className="h-3 w-full" />
          </div>
        </div>
      ))}
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-6 w-6" />
        <Skeleton className="h-8 w-32" />
      </div>
      <Skeleton className="h-4 w-full max-w-md" />
    </div>
  );
};

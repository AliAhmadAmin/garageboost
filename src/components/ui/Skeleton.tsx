"use client";

export function SkeletonLoader() {
  return (
    <div className="space-y-4">
      <div className="h-32 bg-slate-800 rounded-lg animate-pulse" />
      <div className="grid grid-cols-2 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 bg-slate-800 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-12 bg-slate-800 rounded-lg animate-pulse" />
      ))}
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="space-y-4 p-4">
      <div className="h-8 bg-slate-800 rounded w-1/3 animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-slate-800 rounded animate-pulse" />
        <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse" />
      </div>
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function Loading() {
  return (
    <div className='container mx-auto space-y-8 py-8 px-4 sm:px-6 lg:px-8'>
      {/* Header Skeleton */}
      <div className='space-y-2'>
        <Skeleton className='h-9 w-48' />
        <Skeleton className='h-4 w-96' />
      </div>

      <Skeleton className='h-px w-full' />

      {/* Stats Cards Skeleton */}
      <div className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <Skeleton className='h-4 w-24' />
              <Skeleton className='h-8 w-8 rounded-lg' />
            </CardHeader>
            <CardContent>
              <Skeleton className='h-8 w-16 mb-2' />
              <Skeleton className='h-3 w-32' />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search + Filters Skeleton */}
      <div className='flex flex-col gap-4 sm:flex-row'>
        <Skeleton className='h-9 w-full sm:w-64' />
        <div className='flex flex-1 gap-2'>
          <Skeleton className='h-9 w-32' />
          <Skeleton className='h-9 w-32' />
          <Skeleton className='h-9 w-32' />
        </div>
      </div>

      {/* Table Skeleton */}
      <div className='rounded-lg border border-slate-200 bg-white p-4'>
        <div className='mb-4 flex gap-4'>
          {[...Array(7)].map((_, i) => (
            <Skeleton key={i} className='h-5 flex-1' />
          ))}
        </div>
        {[...Array(8)].map((_, i) => (
          <div key={i} className='mb-3 flex gap-4'>
            {[...Array(7)].map((_, j) => (
              <Skeleton key={j} className='h-12 flex-1' />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

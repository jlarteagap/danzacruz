import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export const ChoreographyCardSkeleton = () => {
  return (
    <Card className='mb-6'>
      <CardContent className='p-6'>
        <div className='flex flex-col md:flex-row md:justify-between items-start md:items-center'>
          <div className='flex-1 pr-8'>
            <Skeleton className='h-8 w-3/4 mb-4' />
            <div className='space-y-3'>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-32' />
              </div>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-40' />
              </div>
              <div className='flex items-center gap-3'>
                <Skeleton className='h-4 w-16' />
                <Skeleton className='h-4 w-24' />
              </div>
            </div>
          </div>
          <div className='flex gap-3 mt-4 md:mt-0'>
            <Skeleton className='h-10 w-32' />
            <Skeleton className='h-10 w-24' />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

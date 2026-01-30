'use client';

import { PosterCard } from './posterCard';

export interface Poster {
  id: string;
  title: string;
  year: string;
  imageUrl: string;
}

interface PosterGalleryProps {
  posters: Poster[];
}

export function PosterGallery({ posters }: PosterGalleryProps) {
  return (
    <>
      {/* Gallery Grid */}
      <div className="w-full">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {posters.map((poster) => (
            <div
              key={poster.id}
              className="cursor-pointer transition-transform duration-300 hover:scale-105"
              role="button"
              tabIndex={0}
              aria-label={`Ver cartel de ${poster.title} del año ${poster.year}`}
            >
              <PosterCard poster={poster} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

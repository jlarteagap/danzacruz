'use client';

import Image from 'next/image';
import { Poster } from './posterGallery';

interface PosterCardProps {
  poster: Poster;
}

export function PosterCard({ poster }: PosterCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg bg-card shadow-lg transition-shadow duration-300 hover:shadow-xl">
      {/* Image Container */}
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
        <Image
          src={poster.imageUrl}
          alt={`Afiche: ${poster.title}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>

      {/* Metadata Footer */}
      <div className="space-y-2 p-4">
        <p className="text-sm font-medium text-muted-foreground">{poster.year}</p>
      </div>
    </div>
  );
}

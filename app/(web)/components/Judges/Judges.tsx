'use client'

import * as React from 'react'
import Autoplay from 'embla-carousel-autoplay'
import { judgesList } from './Jusges.data'
import { Card, CardContent } from '@/components/ui/card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel'
import Image from 'next/image'

export default function Judges() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )

  return (
    <section className="my-10 container">
      <div className="flex justify-center">
        <h2 className="text-4xl font-semibold mb-10">Jurados</h2>
      </div>
      <Carousel
        plugins={[plugin.current]}
        className="w-full"
        onMouseEnter={plugin.current.stop}
        onMouseLeave={plugin.current.reset}
      >
        <CarouselContent>
          {judgesList.map(judges => {
            return (
              <CarouselItem
                key={judges.name}
                className="basis-1/2 md:basis-1/3 lg:basis-1/4 "
              >
                <div className="p-1">
                  <Card className="overflow-hidden">
                    <div className="relative w-full h-60">
                      <Image
                        src={judges.photo}
                        alt={judges.name}
                        objectFit="cover"
                        layout="fill"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-lg font-semibold">{judges.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {judges.country}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {judges.desc}
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </section>
  )
}

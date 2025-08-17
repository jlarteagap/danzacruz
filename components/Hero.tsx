import { MessageSquareShare, Calendar, MapPin, Star } from "lucide-react";

export default function Hero() {
  return (
    <section className='relative min-h-screen flex items-center justify-center overflow-hidden'>
      {/* Background with Gradient Overlay */}
      <div className='absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50/90 to-purple-50'>
        {/* Animated Background Elements */}
        <div className='absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl animate-pulse'></div>
        <div className='absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-pulse delay-1000'></div>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-blue-100/20 via-purple-100/20 to-pink-100/20 rounded-full blur-3xl animate-spin [animation-duration:60s]'></div>
      </div>

      {/* Background Image Placeholder */}
      <div className='absolute inset-0 -z-10 bg-gradient-to-br from-neutral-100 to-neutral-200 opacity-40'>
        {/* Placeholder for background image */}
      </div>

      {/* Main Content */}
      <div className='relative z-10 container mx-auto px-6 text-center'>
        {/* Badge */}
        {/* <div className='inline-flex items-center gap-2 px-4 py-2 mb-8 bg-white/60 backdrop-blur-sm border border-white/80 rounded-full shadow-sm'>
          <Star className='w-4 h-4 text-amber-500' />
          <span className='text-sm font-medium text-neutral-700'>
            25 años de tradición
          </span>
        </div> */}

        {/* Main Title */}
        <div className='relative mb-6'>
          <h1 className='text-6xl md:text-8xl lg:text-9xl font-bold text-transparent bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-600 bg-clip-text tracking-tight leading-none'>
            DANZACRUZ
            {/* <span className='absolute -top-2 -right-4 md:-top-4 md:-right-8 text-lg md:text-3xl font-light text-neutral-500 transform rotate-12'>
              2025
            </span> */}
          </h1>
        </div>

        {/* Subtitle */}
        <p className='text-xl md:text-2xl text-neutral-600 mb-12 font-medium leading-relaxed max-w-2xl mx-auto'>
          25 años proyectando Bolivia al mundo
        </p>

        {/* Date Info */}
        <div className='inline-flex items-center gap-3 px-6 py-3 mb-12 bg-white/50 backdrop-blur-sm border border-white/70 rounded-2xl shadow-lg'>
          {/* <Calendar className='w-5 h-5 text-blue-600' />
          <span className='text-lg font-semibold text-neutral-800 uppercase tracking-wide'>
            9 - 12 de Octubre 2025
          </span> */}
          <MapPin className='w-5 h-5 text-purple-600 ml-2' />
          <span className='text-lg font-medium text-neutral-700'>
            Santa Cruz, Bolivia
          </span>
        </div>

        {/* Contact Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center pb-20'>
          <a
            href='http://wa.me/59175095094'
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 ease-out min-w-[200px] justify-center'
          >
            <div className='p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors'>
              <MessageSquareShare className='w-5 h-5' />
            </div>
            <span>75095094</span>
          </a>

          <a
            href='http://wa.me/59175553576'
            target='_blank'
            rel='noopener noreferrer'
            className='group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-full shadow-lg shadow-green-500/25 hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-1 transition-all duration-300 ease-out min-w-[200px] justify-center'
          >
            <div className='p-1 bg-white/20 rounded-lg group-hover:bg-white/30 transition-colors'>
              <MessageSquareShare className='w-5 h-5' />
            </div>
            <span>75553576</span>
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className='relative mt-20'>
          <div className='absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce'>
            <div className='w-6 h-10 border-2 border-neutral-400 rounded-full flex justify-center'>
              <div className='w-1 h-3 bg-neutral-400 rounded-full mt-2 animate-pulse'></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { Facebook, Phone, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className='relative bg-gradient-to-b from-neutral-50 to-neutral-100 border-t border-neutral-200'>
      <div className='absolute inset-0 bg-gradient-to-r from-blue-50/30 to-purple-50/30'></div>

      <div className='relative container mx-auto px-6 py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16'>
          {/* About Section */}
          <div className='lg:col-span-2'>
            <div className='space-y-6'>
              <div>
                <h2 className='text-3xl font-semibold text-neutral-900 tracking-tight'>
                  Festival Danzacruz
                </h2>
                <div className='h-1 w-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-3'></div>
              </div>

              <p className='text-lg text-neutral-600 leading-relaxed max-w-2xl'>
                25 años proyectando Bolivia al mundo a través de la danza,
                celebrando nuestra cultura y tradiciones con pasión y
                excelencia.
              </p>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className='space-y-8'>
            {/* Social Media */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-neutral-900'>
                Síguenos
              </h4>
              <a
                href='https://www.facebook.com/festivaldanzacruz'
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-neutral-200/60 rounded-xl hover:bg-white/80 hover:border-neutral-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group'
              >
                <div className='p-1.5 bg-blue-500 rounded-lg group-hover:bg-blue-600 transition-colors'>
                  <Facebook className='w-4 h-4 text-white' />
                </div>
                <span className='font-medium text-neutral-700 group-hover:text-neutral-900'>
                  Facebook
                </span>
              </a>
            </div>

            {/* Contact */}
            <div className='space-y-4'>
              <h4 className='text-lg font-semibold text-neutral-900'>
                Contacto
              </h4>
              <div className='space-y-2'>
                <a
                  href='http://wa.me/59175095094'
                  className='flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-neutral-200/60 rounded-xl hover:bg-white/80 hover:border-neutral-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group'
                >
                  <div className='p-1.5 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors'>
                    <MessageCircle className='w-4 h-4 text-white' />
                  </div>
                  <span className='font-medium text-neutral-700 group-hover:text-neutral-900'>
                    75095094
                  </span>
                </a>

                <a
                  href='http://wa.me/59175553576'
                  className='flex items-center gap-3 px-4 py-3 bg-white/60 backdrop-blur-sm border border-neutral-200/60 rounded-xl hover:bg-white/80 hover:border-neutral-300 transition-all duration-300 hover:shadow-md hover:-translate-y-0.5 group'
                >
                  <div className='p-1.5 bg-green-500 rounded-lg group-hover:bg-green-600 transition-colors'>
                    <MessageCircle className='w-4 h-4 text-white' />
                  </div>
                  <span className='font-medium text-neutral-700 group-hover:text-neutral-900'>
                    75553576
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className='mt-16 pt-8 border-t border-neutral-200/60'>
          <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
            <p className='text-sm text-neutral-500'>
              © {new Date().getFullYear()} Festival Danzacruz. Todos los
              derechos reservados.
            </p>
            <div className='flex items-center gap-2 text-sm text-neutral-500'>
              <span>Hecho con</span>
              <span className='text-red-500'>♥</span>
              <span>en Bolivia</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

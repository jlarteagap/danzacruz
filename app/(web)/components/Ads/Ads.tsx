import Image from 'next/image'

export const Ads = () => {
  return (
    <>
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Auspiciadores
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5">
            <Image
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
              src="/img/ads/sante.jpg"
              alt="Transistor"
              width="158"
              height="158"
            />
            <Image
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
              src="/img/ads/el-solar.png"
              alt="Reform"
              width="158"
              height="158"
            />
            <Image
              className="col-span-2 max-h-40 w-full object-contain lg:col-span-1"
              src="/img/ads/hotel-libertador.jpg"
              alt="Tuple"
              width="158"
              height="158"
            />
            <Image
              className="col-span-2 max-h-40 w-full object-contain sm:col-start-2 lg:col-span-1"
              src="/img/ads/ibta.jpg"
              alt="SavvyCal"
              width="158"
              height="158"
            />
            <Image
              className="col-span-2 col-start-2 max-h-40 w-full object-contain sm:col-start-auto lg:col-span-1"
              src="/img/ads/avanti.jpg"
              alt="Statamic"
              width="158"
              height="158"
            />
          </div>
        </div>
      </div>
    </>
  )
}

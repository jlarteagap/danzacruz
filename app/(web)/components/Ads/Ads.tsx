import Image from 'next/image'
import { AdsList, SupportList } from './Ads..data'

export const Ads = () => {
  return (
    <>
      <section className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Auspiciadores
          </h2>
          <div className="mx-auto mt-10 grid max-w-lg grid-cols-4 items-center gap-x-8 gap-y-10 sm:max-w-xl sm:grid-cols-6 sm:gap-x-10 lg:mx-0 lg:max-w-none lg:grid-cols-5 justify-center">
            {AdsList.map((ad, i) => {
              return (
                <Image
                  key={i}
                  className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 rounded-md shadow-sm"
                  src={ad.logo}
                  alt={ad.name}
                  width="158"
                  height="158"
                />
              )
            })}
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-6 lg:px-8 mt-20">
          <h2 className="text-center text-lg/8 font-semibold text-gray-900">
            Apoyo
          </h2>
          <div className="mx-auto mt-10 grid justify-center grid-cols-2">
            {SupportList.map((sup, i) => {
              return (
                <Image
                  key={i}
                  className="col-span-2 max-h-40 w-full object-contain lg:col-span-1 rounded-md shadow-sm"
                  src={sup.logo}
                  alt={sup.name}
                  width="158"
                  height="158"
                />
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}

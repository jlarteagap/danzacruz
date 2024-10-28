export function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-7">
      <div className="container mx-auto flex flex-col md:flex-row md:gap-5 px-4">
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl text-slate-50 font-bold">
            Acerca del Festival Danzacruz
          </h2>
          <p className="pt-4">24 años proyectando Bolivia al mundo</p>
        </div>
        <div className="w-full ">
          <div>
            <h4 className="text-2xl font-semibold">Redes Sociales</h4>
            <div>
              <a
                href="https://www.facebook.com/festivaldanzacruz"
                target="_blank"
                className="hover:text-fuchsia-600 transition-all"
              >
                Facebook
              </a>
            </div>
          </div>
          <div>
            <h4 className="text-2xl font-semibold">Contacto</h4>
            <div className="flex flex-col">
              <a
                href="http://wa.me/59175020012"
                className="hover:text-fuchsia-600 transition-all"
              >
                75020012
              </a>
              <a
                href="http://wa.me/59175553576"
                className="hover:text-fuchsia-600 transition-all"
              >
                75553576
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

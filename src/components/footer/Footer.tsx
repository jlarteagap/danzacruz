export function Footer() {
  return (
    <footer className="bg-black text-white py-7">
      <div className="container mx-auto flex flex-col md:flex-row md:gap-5 px-4">
        <div className="w-full md:w-1/3">
          <h2 className="text-2xl text-slate-50 font-bold">
            Acerca del Festival Danzacruz
          </h2>
          <p className="pt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda
            vel asperiores qui quis, voluptates animi deserunt voluptas quae
            libero ab rerum optio nemo illum nulla, amet natus perspiciatis nam
            quisquam.
          </p>
        </div>
        <div className="w-full">
          <div>Links</div>
          <div>Social links</div>
        </div>
      </div>
    </footer>
  )
}

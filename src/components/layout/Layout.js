import 'bulma/css/bulma.min.css'
import '../../../public/css/style.css'

export const Layout = ({ children }) => {
  return (
    <main className="container">
      {children}
      <footer className="footer mt-5 is-flex is-justify-content-center">
        <div>Festival Danzacruz 2023</div>
      </footer>
    </main>
  )
}

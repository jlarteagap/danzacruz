import 'bulma/css/bulma.min.css'
// import { Header } from '../header/header'

export const Layout = ({ children }) => {
  return (
    <main className="container">
      {/* <Header /> */}
      {children}
      <footer className="footer mt-5 is-flex is-justify-content-center">
        <div>Festival Danzacruz 2023</div>
      </footer>
    </main>
  )
}

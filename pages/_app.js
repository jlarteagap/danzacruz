import { Layout } from '../src/components/layout/Layout'
import '../public/css/style.css'
import '../app/ui/global.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

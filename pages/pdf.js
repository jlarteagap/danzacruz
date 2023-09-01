import { PDFViewer } from '@react-pdf/renderer'
import { Certificade } from '../src/pdf/certificade'
import { useEffect, useState } from 'react'

const Pdf = () => {
  const [isClient, setIsClient] = useState(false)
  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <div style={{ with: '100%', backgroundColor: 'red' }}>
      {isClient ? (
        <PDFViewer style={{ width: '100%', height: '80vh' }}>
          <Certificade name="Jorge Arteaga" />
        </PDFViewer>
      ) : null}
    </div>
  )
}

export default Pdf

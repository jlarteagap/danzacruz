import { PosterGallery } from '@/components/Galeria/posterGallery';
import { mockPosters } from '@/lib/posters';

export const metadata = {
  title: 'DanzaCruz - 25 Años de Danza',
  description:
    'Galería de afiches de DanzaCruz. Explora 25 años de arte, danza y expresión cultural en nuestra colección histórica.',
  openGraph: {
    title: 'DanzaCruz - Archivo Histórico de Afiches',
    description:
      'Descubre la trayectoria visual de DanzaCruz a través de sus afiches de performance',
    type: 'website',
  },
};

export default function AfichePage() {
    return (<main className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-pretty font-serif text-4xl font-bold text-foreground sm:text-5xl lg:text-6xl">
              DANZACRUZ
            </h1>
            <p className="max-w-2xl font-serif text-xl italic text-muted-foreground sm:text-2xl">
              25 años de arte, movimiento y expresión cultural
            </p>
            <p className="max-w-3xl leading-relaxed text-foreground">
              Bienvenido al archivo visual de DanzaCruz. Aquí encontrarás una
              recopilación de afiches que documentan nuestra trayectoria desde
              el 2006 hasta hoy. Cada imagen cuenta una historia de
              experimentación, creación y compromiso con el arte de la danza.
            </p>
          </div>
        </div>
      </header>

      {/* Gallery Section */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Title */}
          <div className="mb-12 space-y-2 sm:mb-16">
            <h2 className="font-serif text-3xl font-bold text-foreground sm:text-4xl">
              Archivo de Afiches
            </h2>
            <p className="text-muted-foreground">
              Haz clic en cualquier afiche para ver los detalles completos
            </p>
          </div>

          {/* Gallery Grid */}
          <PosterGallery posters={mockPosters} />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-4 text-center sm:space-y-2 sm:text-left">
            <p className="text-xs text-muted-foreground">
              Dedicado a la preservación y difusión del patrimonio cultural de la
              danza.
            </p>
          </div>
        </div>
      </footer>
    </main>);
}
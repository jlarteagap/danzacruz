import AddParticipant from "@/components/AddParticipant/AddParticipant";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Registro Festival Internacional de Danza",
  description:
    "Regístrate en el Festival Internacional de Danza y sé parte de la mayor celebración artística y cultural.",
  openGraph: {
    title: "Registro Festival Internacional de Danza",
    description:
      "Vive la experiencia única de la danza en el festival más importante del país.",
    url: "https://danzacruz.com/registro",
    siteName: "Danzacruz",
    images: [
      {
        width: 1200,
        height: 630,
        alt: "Festival Internacional de Danza",
        url: "/og-image.jpg",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Registro Festival Internacional de Danza",
    description: "Forma parte del festival más vibrante de danza.",
    // images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
};

export default function RegisterPage() {
  return (
    <main className='container py-10 m-auto' role='main'>
      <header className='text-center mb-6'>
        <h1 className='text-4xl uppercase font-bold'>Registro</h1>
      </header>

      <section className='max-w-3xl mx-auto text-center mb-10'>
        <p className='text-lg leading-relaxed text-gray-700'>
          Forma parte de una celebración única donde el arte y la cultura se
          funden en un espectáculo vibrante de energía, talento y pasión por la
          danza.
        </p>
      </section>

      <section className='max-w-2xl mx-auto'>
        <AddParticipant />
      </section>
    </main>
  );
}

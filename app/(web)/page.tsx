import Hero from "./components/Hero";
import Cta from "@/components/CTA/cta";
import Info from "@/components/Info/Info";
import Modalidad from "@/components/Modalidad/Modalidad";
import Times from "@/components/Times/Times";

export default function Page() {
  return (
    <>
      <Hero />
      <Cta />
      <Info />
      <Modalidad />
      <Times />
    </>
  );
}

"use server";
import Hero from "../../components/Hero";
import Cta from "@/components/CTA/cta";
import Info from "@/components/Info/Info";
import Modalidad from "@/components/Modalidad/Modalidad";
import Times from "@/components/Times/Times";
import { Ads } from "@/components/Ads/Ads";

export default async function Page() {
  return (
    <>
      <Hero />
      <Cta />
      <Info />
      <Modalidad />
      <Times />
      {/* <Awards /> */}
      <Ads />
    </>
  );
}

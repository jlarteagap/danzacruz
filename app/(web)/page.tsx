"use server";
import Hero from "../../components/Hero";
import Cta from "@/components/CTA/cta";
import Info from "@/components/Info/Info";
import Modalidad from "@/components/Modalidad/Modalidad";
import Times from "@/components/Times/Times";
// import { Ads } from "@/components/Ads/Ads";
import Awards from "@/components/Awards/Awards";
import { Ads } from "@/components/Ads/Ads";
import { Navbar } from "@/components/navbar";

import { auth } from "@/auth";

export default async function Page() {
  return (
    <>
      <Hero />
      <Cta />
      <Info />
      <Modalidad />
      <Times />
      <Awards />
      {/* <Ads /> */}
    </>
  );
}

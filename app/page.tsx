"use client";

import EmblaCarousel from "@/components/EmblaCarousel";
import { EmblaOptionsType } from "embla-carousel";

const OPTIONS: EmblaOptionsType = {};
const SLIDES = Array.from(Array(4).keys());

function page() {
  return <EmblaCarousel slides={SLIDES} options={OPTIONS} />;
}

export default page;

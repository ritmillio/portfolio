"use client";

import { LayoutGroup, motion, useScroll, useTransform } from "motion/react";
import { TextRotate } from "@/components/common/text-rotate";
import { NumberTicker } from "@/components/common/number-ticker";
import { Beer, Coffee, MountainSnow, Sun } from "lucide-react";
import { TextReveal } from "@/components/common/text-reveal";
import { Footer } from "./_components/footer";
import { Map } from "@/components/common/map";
import { Mac } from "@/components/common/mac";

export default function Page() {
  const { scrollYProgress } = useScroll();
  // Reverse the zoom: start at scale 2 (zoomed in) and zoom out to 1.
  const scale = useTransform(scrollYProgress, [0, 0.3], [2, 1]);

  return (
    <>
      <div className="text-base sm:text-lg md:text-xl">
        {/** MAC SECTION WITH HERO OVERLAID */}
        <div className="relative flex h-screen w-full items-center justify-center">
          <motion.div
            style={{ scale }}
            className="relative flex w-full items-center justify-center"
          >
            <Mac width={600} height={500} />
            {/** Overlay container positioned to match the Mac screen area */}
          </motion.div>
        </div>

        {/** TEXT REVEAL */}
        <TextRevealDemo />

        {/** ADDITIONAL CONTENT */}
        <div className="my-20">
          <p className="text-4xl font-thin tracking-tight">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
            quos.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

function TextRevealDemo() {
  return (
    <div className="z-10 flex min-h-[1024px] flex-col items-center justify-center rounded-lg bg-white dark:bg-black">
      <TextReveal text="Magic UI will change the way you design. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos." />
      <div className="h-[320px] w-[320px]">
        <Map />
      </div>
    </div>
  );
}

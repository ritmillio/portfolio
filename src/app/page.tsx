"use client";

import { LayoutGroup, motion } from "motion/react";
import { TextRotate } from "@/components/common/text-rotate";
import { NumberTicker } from "@/components/common/number-ticker";
import { Beer, Coffee, MountainSnow, Sun } from "lucide-react";
import { TextReveal } from "@/components/common/text-reveal";
import { Footer } from "./_components/footer";
import { Map } from "@/components/common/map";

export default function Page() {
  return (
    <>
      <div className="text-base sm:text-lg md:text-xl">
        <div className="relative flex h-screen flex-col items-center justify-center">
          <LayoutGroup>
            {/* Changed from motion.p to motion.div */}
            <motion.div
              className="flex items-center justify-center whitespace-pre"
              layout
            >
              <TextRotate
                texts={[
                  // Hallo (German)
                  <span className="flex items-center gap-1" key="hallo">
                    <span className="font-thin">Halo!</span>
                    <Beer strokeWidth={1} className="size-5 text-white" />
                  </span>,

                  // Hola (Spanish)
                  <span className="flex items-center gap-1" key="hola">
                    <span className="font-thin">Hola!</span>
                    <Sun strokeWidth={1} className="size-5 text-white" />
                  </span>,

                  // こんにちは (Japanese)
                  <span className="flex items-center gap-1" key="konnichiwa">
                    <span className="font-thin">こんにちは</span>
                    <MountainSnow
                      strokeWidth={1}
                      className="size-5 text-white"
                    />
                  </span>,

                  // Hello (English)
                  <span className="flex items-center gap-1" key="hello">
                    <span className="font-thin">Hello!</span>
                    <Coffee strokeWidth={1} className="size-5 text-white" />
                  </span>,
                ]}
                mainClassName="text-white px-2 sm:px-2 md:px-3 h-[200px] w-[500px] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center flex items-center justify-center"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                rotationInterval={500}
                loop={false}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-center text-sm"
              />
            </motion.div>
          </LayoutGroup>
          <p className="absolute right-0 top-0 mr-1 mt-1">
            <span className="text-right text-sm tracking-tighter text-black dark:text-white">
              Based in Vienna <br /> Austria
            </span>
          </p>
          <p className="absolute bottom-0 right-0 mb-1 mr-1 whitespace-pre-wrap text-sm tracking-tighter text-black dark:text-white">
            <NumberTicker value={100} speed={0.6} />
          </p>
        </div>
        <TextRevealDemo />
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

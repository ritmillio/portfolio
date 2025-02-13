"use client";

import { LayoutGroup, motion } from "motion/react";
import { TextRotate } from "@/components/common/text-rotate";
import { NumberTicker } from "@/components/common/number-ticker";
import {
  Beer,
  Coffee,
  Flag,
  MountainSnow,
  Pencil,
  Sun,
  Wine,
} from "lucide-react";

export default function Page() {
  return (
    <div className="p-12 text-base sm:text-lg md:text-xl">
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
                <span>Hallo!</span>
                <Beer className="size-4" />
              </span>,

              // Hola (Spanish)
              <span className="flex items-center gap-1" key="hola">
                <span>Hola!</span>
                <Sun className="size-4" />
              </span>,

              // こんにちは (Japanese)
              <span className="flex items-center gap-1" key="konnichiwa">
                <span>こんにちは</span>
                <MountainSnow className="size-4" />
              </span>,

              // Hello (English)
              <span className="flex items-center gap-1" key="hello">
                <span>Hello!</span>
                <Coffee className="size-4" />
              </span>,
            ]}
            mainClassName="text-white px-2 sm:px-2 md:px-3 h-[200px] w-[500px] overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center flex items-center justify-center"
            staggerFrom={"last"}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            rotationInterval={1250}
            loop={false}
            splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-center text-sm"
          />
        </motion.div>
      </LayoutGroup>
      <p className="absolute bottom-0 right-0 mb-1 mr-1 whitespace-pre-wrap text-sm tracking-tighter text-black dark:text-white">
        <NumberTicker value={100} speed={0.6} />
      </p>
    </div>
  );
}

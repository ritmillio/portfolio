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
import { useEffect } from "react";

export default function Page() {
  /** locking screen intentionally for displaying animation properly */
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      document.body.style.overflow = originalStyle;
    }, 4000);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div className="min-h-[400vh] text-base sm:text-lg md:text-xl">
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
                  <MountainSnow strokeWidth={1} className="size-5 text-white" />
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
      <div className="my-20">
        <p className="text-4xl font-thin tracking-tight">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
          quos.
        </p>
      </div>
    </div>
  );
}

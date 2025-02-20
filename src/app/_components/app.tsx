import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mac } from "@/components/common/mac";
import { TextRotate } from "@/components/common/text-rotate";
import { Beer, Sun, MountainSnow, Coffee } from "lucide-react";

function App() {
  const [showMac, setShowMac] = useState(false);

  // Wait for text reveal animation to complete before showing the Mac.
  useEffect(() => {
    // Adjust this delay to match your text reveal animation duration.
    const timer = setTimeout(() => {
      setShowMac(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      {/* Text Reveal Animation */}
      {!showMac && (
        <>
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <TextRotate
              texts={[
                <span key="hallo" className="flex items-center gap-1">
                  <span className="font-thin text-white">Halo!</span>
                  <Beer strokeWidth={1} className="size-5 text-white" />
                </span>,
                <span key="hola" className="flex items-center gap-1">
                  <span className="font-thin text-white">Hola!</span>
                  <Sun strokeWidth={1} className="size-5 text-white" />
                </span>,
                <span key="konnichiwa" className="flex items-center gap-1">
                  <span className="font-thin text-white">こんにちは</span>
                  <MountainSnow strokeWidth={1} className="size-5 text-white" />
                </span>,
                <span key="hello" className="flex items-center gap-1">
                  <span className="font-thin text-white">Hello!</span>
                  <Coffee strokeWidth={1} className="size-5 text-white" />
                </span>,
              ]}
              mainClassName="text-4xl text-black"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              rotationInterval={500}
              loop={false}
              splitLevelClassName="overflow-hidden"
            />
          </motion.div>
        </>
      )}

      {/* Mac Animation */}
      {showMac && (
        <motion.div
          className="flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Mac />
        </motion.div>
      )}
    </div>
  );
}

export default App;

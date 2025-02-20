import React from "react";
import type { SVGProps } from "react";
import { LayoutGroup, motion } from "framer-motion";
import { TextRotate } from "./text-rotate";
import { Beer, Sun, MountainSnow, Coffee } from "lucide-react";
import { NumberTicker } from "./number-ticker";

export interface MacProps extends SVGProps<SVGSVGElement> {
  width?: number;
  height?: number;
  src?: string;
}

export function Mac({ width = 600, height = 500, src, ...props }: MacProps) {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* Mac base elements */}
      <rect
        fill="url(#linear-gradient)"
        x="232.4"
        y="401.32"
        width="135.19"
        height="83.37"
      />
      <rect
        fill="#dedfe2"
        x="234.32"
        y="489.39"
        width="17.21"
        height="1.9"
        rx=".15"
        ry=".15"
      />
      <rect
        fill="#dedfe2"
        x="348.45"
        y="489.39"
        width="17.21"
        height="1.9"
        rx=".15"
        ry=".15"
      />
      <rect fill="#dedfe1" x="232.4" y="484.69" width="135.19" height="5.61" />
      <path
        fill="#eeeeef"
        d="M23.83,10.99h552.03c4.92,0,8.91,3.99,8.91,8.91v324.18H14.92V19.9c0-4.92,3.99-8.91,8.91-8.91Z"
      />
      <path
        fill="#d9d9db"
        d="M23.83,343.94h552.03c4.92,0,8.91,3.99,8.91,8.91v48.47H14.92v-48.47c0-4.92,3.99-8.91,8.91-8.91Z"
        transform="translate(599.69 745.26) rotate(180)"
      />
      <path
        fill="#231f20"
        d="M570.43,330.43H29.57c-.44,0-.79-.36-.79-.79V25.47c0-.44.36-.79.79-.79h540.87c.44,0,.79.36.79.79v304.17c0,.44-.36.79-.79.79ZM29.57,25.37c-.05,0-.1.04-.1.09v304.17c0,.05.04.1.1.1h540.87c.05,0,.09-.04.09-.1V25.47c0-.05-.04-.09-.09-.09H29.57Z"
      />
      {/* Mac screen background */}
      <rect
        fill="#000"
        x="29.12"
        y="25.02"
        width="541.76"
        height="305.06"
        rx=".44"
        ry=".44"
      />

      {/* Embedding HTML into the Mac screen using foreignObject */}
      <foreignObject x="29.12" y="25.02" width="541.76" height="305.06">
        <div style={{ width: "100%", height: "100%", position: "relative" }}>
          {/* Animated content */}
          {/* <div className="relative flex h-full w-full flex-col items-center justify-center">
            <LayoutGroup>
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
                  mainClassName="text-white px-2 sm:px-2 md:px-3 h-[200px] w-[500px] overflow-hidden py-0.5 sm:py-1 md:py-2 flex items-center justify-center"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  rotationInterval={500}
                  loop={false}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1 text-center text-sm"
                />
              </motion.div>
            </LayoutGroup>
            <p className="absolute right-0 top-0 mr-1 mt-1 flex items-end justify-end">
              <span className="text-right text-sm tracking-tighter text-black dark:text-white">
                Based in Vienna <br /> Austria
              </span>
            </p>
            <p className="absolute bottom-0 right-0 mb-1 mr-1 whitespace-pre-wrap text-sm tracking-tighter text-black dark:text-white">
              <NumberTicker value={100} speed={0.6} />
            </p>
          </div> */}
        </div>
      </foreignObject>

      {/* Optional image overlay if src is provided */}
      {src && (
        <image
          href={src}
          x="29.12"
          y="25.02"
          width="541.76"
          height="305.06"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#roundedCorners)"
        />
      )}

      <defs>
        <clipPath id="roundedCorners">
          <rect
            fill="#ffffff"
            x="29.12"
            y="25.02"
            width="541.76"
            height="305.06"
            rx=".44"
            ry=".44"
          />
        </clipPath>
      </defs>

      <linearGradient
        id="linear-gradient"
        x1="300"
        y1="484.69"
        x2="300"
        y2="401.32"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#a7a9ac" />
        <stop offset=".1" stopColor="#d1d3d4" />
        <stop offset=".41" stopColor="#e6e7e8" />
        <stop offset=".73" stopColor="#e6e7e8" />
        <stop offset="1" stopColor="#d1d3d4" />
      </linearGradient>
    </svg>
  );
}

export default Mac;

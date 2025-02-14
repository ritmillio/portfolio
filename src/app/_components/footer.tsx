"use client";

import Link from "next/link";
import { ComesInGoesOutUnderline } from "@/components/common/underline-animation";

export function Footer() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="flex h-full flex-row items-start space-x-8 py-36 text-lg text-sm uppercase text-black dark:text-white md:text-base">
        <div>Contact</div>
        <ul className="flex h-full flex-col space-y-1">
          <Link href="#">
            <ComesInGoesOutUnderline label="LINKEDIN" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline label="INSTAGRAM" direction="right" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline label="X (TWITTER)" direction="left" />
          </Link>

          <div className="pt-12">
            <ul className="flex h-full flex-col space-y-1">
              <Link href="#">
                <ComesInGoesOutUnderline
                  label="FANCY@FANCY.DEV"
                  direction="left"
                />
              </Link>
              <Link href="#">
                <ComesInGoesOutUnderline
                  label="HELLO@FANCY.DEV"
                  direction="right"
                />
              </Link>
            </ul>
          </div>
        </ul>
      </div>
    </div>
  );
}

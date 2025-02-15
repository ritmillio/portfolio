"use client";

import Link from "next/link";
import { ComesInGoesOutUnderline } from "@/components/common/underline-animation";

export function Footer() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-background">
      <div className="mx-1 mb-2 flex h-full w-full flex-row items-center justify-between text-sm uppercase text-black dark:text-white md:text-base">
        <div>Contact</div>
        <ul className="flex h-full items-center justify-center gap-x-4">
          <Link href="#">
            <ComesInGoesOutUnderline label="LINKEDIN" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline label="INSTAGRAM" direction="right" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline label="X (TWITTER)" direction="left" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline label="FANCY@FANCY.DEV" direction="left" />
          </Link>
          <Link href="#">
            <ComesInGoesOutUnderline
              label="HELLO@FANCY.DEV"
              direction="right"
            />
          </Link>
        </ul>
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import mapboxgl from "mapbox-gl";
import { useTheme } from "next-themes";
import Image from "next/image";
import { env } from "@/env";

export function Map() {
  const { theme } = useTheme();

  const [mouseEntered, setMouseEntered] = useState(false);
  const [zoom, setZoom] = useState(12);
  const mapRef = useRef<HTMLDivElement>(null);
  // Keep a reference to the map instance
  const mapInstanceRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    mapboxgl.accessToken = env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const map = new mapboxgl.Map({
      container: mapRef.current,
      style:
        theme === "dark"
          ? "mapbox://styles/mapbox/dark-v10"
          : "mapbox://styles/mapbox/light-v10",
      center: [16.3738, 48.2082],
      zoom,
      dragPan: true,
      scrollZoom: true,
    });

    // On load, force a resize so it fills the container
    map.on("load", () => {
      map.resize();
    });

    // Sync the zoom state with the map's internal zoom level
    const handleZoom = () => {
      setZoom(map.getZoom());
    };
    map.on("zoom", handleZoom);

    // Store the map instance for later use
    mapInstanceRef.current = map;

    // Clean up on unmount
    return () => {
      map.off("zoom", handleZoom);
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []); // Only run once

  // Update the map style if the theme changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setStyle(
        theme === "dark"
          ? "mapbox://styles/mapbox/dark-v10"
          : "mapbox://styles/mapbox/light-v10",
      );
    }
  }, [theme]);

  // Handle zoom controls using Mapbox's flyTo
  const handleZoomControl = (type: "in" | "out") => {
    const map = mapInstanceRef.current;
    if (!map) return;
    const delta = 2;
    const newZoom = type === "in" ? zoom + delta : zoom - delta;
    map.flyTo({ zoom: newZoom });
    // The zoom state will update via the "zoom" event listener
  };

  return (
    <div
      className="relative flex h-full w-full cursor-grab items-center justify-center rounded-[32px] bg-background focus:outline-none active:cursor-grabbing"
      onMouseEnter={() => setMouseEntered(true)}
      onMouseLeave={() => setMouseEntered(false)}
    >
      <div ref={mapRef} className="absolute left-0 top-0 z-10 h-full w-full" />

      {zoom > 2 && (
        <motion.div
          key="out"
          className="absolute bottom-[14px] right-[14px] z-[1] flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--card))] shadow-[0_1px_3px_hsla(var(--ring),0.1)] transition-shadow duration-200 ease-in-out hover:cursor-pointer hover:shadow-[0_4px_6px_hsla(var(--ring),0.2)]"
          onClick={() => handleZoomControl("out")}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.25, delay: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0,0H24V24H0Z" fill="none" />
            <path
              d="M16,12H8"
              fill="none"
              stroke="var(--icon)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      )}

      {zoom < 20 && (
        <motion.div
          key="in"
          className="absolute bottom-[14px] right-[14px] z-[1] flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(var(--card))] shadow-[0_1px_3px_hsla(var(--ring),0.1)] transition-shadow duration-200 ease-in-out hover:cursor-pointer hover:shadow-[0_4px_6px_hsla(var(--ring),0.2)]"
          onClick={() => handleZoomControl("in")}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.25, delay: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0,0H24V24H0Z" fill="none" />
            <path
              d="M12,8v8"
              fill="none"
              stroke="var(--icon)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
            <path
              d="M16,12H8"
              fill="none"
              stroke="var(--icon)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            />
          </svg>
        </motion.div>
      )}
    </div>
  );
}

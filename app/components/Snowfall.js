// src/components/Snowfall.js

"use client";

import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSnowflake } from "@fortawesome/free-solid-svg-icons";

export default function Snowfall() {
  useEffect(() => {
    const snowflakes = document.querySelectorAll(".snowflake");
    snowflakes.forEach((snowflake) => {
      const randomX = Math.random() * 100; // Random horizontal position as a percentage
      const randomDelay = Math.random() * 10; // Delay between 0s and 10s
      const randomFallDuration = 10 + Math.random() * 10; // Falling duration between 10s and 20s

      const shouldRotate = Math.random() < 0.8; // 80% chance to rotate
      const rotationDirection =
        Math.random() < 0.5 ? "Clockwise" : "Counterclockwise"; // Randomize rotation direction

      // Apply position and delay for all snowflakes
      snowflake.style.left = `${randomX}%`;
      snowflake.style.animationDelay = `${randomDelay}s`;
      snowflake.style.animationDuration = `${randomFallDuration}s`;

      if (shouldRotate) {
        snowflake.style.animationName = `fallAndRotate${rotationDirection}`;
      } else {
        snowflake.style.animationName = "fall";
      }
    });
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10">
      {Array.from({ length: 100 }).map((_, index) => (
        <div key={index} className="snowflake absolute">
          <FontAwesomeIcon icon={faSnowflake} />
        </div>
      ))}
    </div>
  );
}

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
      const randomDuration = 10 + Math.random() * 10; // Duration between 10s and 20s

      // Apply styles
      snowflake.style.left = `${randomX}%`; // Horizontal position as percentage
      snowflake.style.animationDelay = `${randomDelay}s`; // Delay
      snowflake.style.animationDuration = `${randomDuration}s`; // Duration
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

"use client";

import React, { useState } from "react";

export default function ChildrenTile({ color, hoverColor }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="w-28 h-28 rounded"
      style={{
        backgroundColor: isHovered ? hoverColor : color,
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    ></div>
  );
}

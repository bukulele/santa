"use client";

import React, { useState } from "react";
import Image from "next/image";

export default function ChildrenTile({ color, hoverColor }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleEditChild = () => {
    console.log("handleEditChild");
  };

  return (
    <div
      className="w-28 h-28 rounded p-2 flex flex-col items-center gap-4 cursor-pointer"
      style={{
        backgroundColor: isHovered ? hoverColor : color,
        transition: "background-color 0.3s ease",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleEditChild}
    >
      <Image
        alt="child avatar"
        src="/boys/bonbon-smiling-man-with-blue-hair.png"
        width={50}
        height={50}
        className="bg-white rounded-full p-1"
      />
      <p className="font-bold m-0 leading-none text-white text-sm">
        Name Surname
      </p>
    </div>
  );
}

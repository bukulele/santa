// src/app/page.js

import React from "react";
import Snowfall from "./components/Snowfall";
import Link from "next/link";
import WelcomeBlock from "./components/WelcomeBlock";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Snowfall />
        <WelcomeBlock />
      </div>
      {/* Parents' Corner Button */}
      <div className="absolute top-4 right-4">
        <Link
          href="/parents-corner"
          className="text-sm text-gray-300 hover:text-gray-100 transition duration-300 ease-in-out"
        >
          Parents' Corner
        </Link>
      </div>
    </>
  );
}

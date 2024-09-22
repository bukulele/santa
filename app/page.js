// src/app/page.js

import React from "react";
import Snowfall from "./components/Snowfall";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <div className="relative">
        <Snowfall />
        <h1 className="text-4xl font-bold mb-6">
          Welcome to the Magical Advent Calendar
        </h1>
        <p className="text-xl mb-8">Unwrap the magic of Christmas every day!</p>
        <button className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded-lg text-lg transition duration-300 ease-in-out">
          Start the Adventure
        </button>
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

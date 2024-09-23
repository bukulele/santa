// src/app/[userName]/page.js

"use client";

import React, { useState, useEffect } from "react";
import Snowfall from "../components/Snowfall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faGift,
  faPlus,
  faQuestionCircle,
} from "@fortawesome/free-solid-svg-icons";

export default function ChildPage({ params }) {
  const { userName } = params;
  const calendarLength = 31; // Or 31 based on parent selection

  // List of positive phrases
  const phrases = [
    "Keep up the great work, {name}!",
    "You're doing amazing, {name}!",
    "Way to go, {name}!",
    "Every day is a new adventure, {name}!",
    "You're a star, {name}!",
  ];

  // Randomly select a phrase
  const [phrase, setPhrase] = useState("");

  useEffect(() => {
    const randomPhrase = phrases[Math.floor(Math.random() * phrases.length)];
    setPhrase(randomPhrase.replace("{name}", userName));
  }, [userName]);

  const days = Array.from({ length: calendarLength }).map((_, index) => ({
    day: index + 1,
    status: getStatusForDay(index + 1), // function to determine the status of each day
  }));

  return (
    <>
      <Snowfall />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-500 to-blue-800 p-4">
        {/* Music Toggle in the Top Right Corner */}
        <div className="absolute top-4 right-4">
          <button className="text-white text-2xl">
            <FontAwesomeIcon icon={faMusic} />
          </button>
        </div>

        {/* Personalized Phrase */}
        <div className="mb-8 text-white text-2xl font-bold text-center">
          {phrase}
        </div>

        {/* Responsive Advent Calendar with vertical scroll */}
        <div className="w-full max-w-4xl overflow-y-auto">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-4">
            {days.map((dayObj, index) => (
              <div
                key={index}
                className={`relative p-4 rounded-lg shadow-lg text-center ${
                  dayObj.status === "locked"
                    ? "bg-gray-300 cursor-not-allowed"
                    : dayObj.status === "done"
                    ? "bg-green-300"
                    : "bg-red-300 cursor-pointer hover:bg-red-400"
                }`}
              >
                {/* Icon based on status */}
                <FontAwesomeIcon
                  icon={
                    dayObj.status === "locked"
                      ? faQuestionCircle
                      : dayObj.status === "done"
                      ? faPlus
                      : faGift
                  }
                  className="text-3xl text-white mb-2"
                />
                <span className="text-xl font-bold">{dayObj.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// Placeholder function to determine the status of each day
function getStatusForDay(day) {
  const today = new Date().getDate();
  if (day > today) return "locked";
  if (day === today) return "available";
  return "done";
}

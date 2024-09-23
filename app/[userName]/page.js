// src/app/[userName]/page.js

"use client";

import React, { useState, useEffect } from "react";
import Snowfall from "../components/Snowfall";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faGift,
  faCandyCane,
  faTree,
  faKeyboard,
  faImage,
  faVideo,
  faCircleXmark,
} from "@fortawesome/free-solid-svg-icons";
import getStatusForDay from "../functions/getStatusForDay";
import ModalContainer from "../components/ModalContainer";
import Image from "next/image";

export default function ChildPage({ params }) {
  const [musicOn, setMusicOn] = useState(false);
  const [taskModalOpen, setTaskModalOpen] = useState(false);
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

  const handleMusicPlay = () => {
    setMusicOn(!musicOn);
  };

  const handleTaskOpen = () => {
    setTaskModalOpen(true);
  };

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
          <button className="text-white text-2xl" onClick={handleMusicPlay}>
            <FontAwesomeIcon
              className={musicOn ? "text-white" : "text-red-300"}
              icon={faMusic}
            />
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
                onClick={dayObj.status === "locked" ? null : handleTaskOpen}
                key={index}
                className={`relative p-4 rounded-lg shadow-lg text-center ${
                  dayObj.status === "locked"
                    ? "bg-gray-300"
                    : dayObj.status === "done"
                    ? "bg-green-300 hover:bg-green-400"
                    : "bg-red-300 hover:bg-red-400"
                }`}
              >
                {/* Icon based on status */}
                <FontAwesomeIcon
                  icon={
                    dayObj.status === "locked"
                      ? faGift
                      : dayObj.status === "done"
                      ? faCandyCane
                      : faTree
                  }
                  className="text-3xl text-white mb-2"
                />
                <span className="text-xl font-bold">{dayObj.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ModalContainer
        modalIsOpen={taskModalOpen}
        setModalClose={() => setTaskModalOpen(false)}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <Image
            alt="Christmas tree icon"
            src="/c-tree-presents.png"
            height={100}
            width={100}
          />
          <p className="font-extrabold text-center">Task Name</p>
          <p className="text-center">
            Doloribus architecto aut doloremque. Exercitationem possimus quia
            repudiandae similique. Eligendi fugit facere officiis inventore
            eaque voluptatum nesciunt. Quidem doloremque minus animi ab rerum
            officia incidunt. Et hic omnis quia.
          </p>
          <div className="flex justify-center items-center gap-3">
            <button className="px-2 py-1 rounded text-white bg-red-300">
              <FontAwesomeIcon icon={faMusic} />
            </button>
            <button className="px-2 py-1 rounded text-white bg-lime-300">
              <FontAwesomeIcon icon={faVideo} />
            </button>
            <button className="px-2 py-1 rounded text-white bg-blue-300">
              <FontAwesomeIcon icon={faKeyboard} />
            </button>
            <button className="px-2 py-1 rounded text-white bg-orange-300">
              <FontAwesomeIcon icon={faImage} />
            </button>
          </div>
          <button
            onClick={() => setTaskModalOpen(false)}
            className="mt-3 px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded transition duration-300 ease-in-out flex items-center gap-3"
          >
            Close <FontAwesomeIcon className="text-xl" icon={faCircleXmark} />
          </button>
        </div>
      </ModalContainer>
    </>
  );
}

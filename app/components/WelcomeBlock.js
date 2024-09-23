"use client";
import React, { useState } from "react";
import ModalContainer from "./ModalContainer";
import Link from "next/link";

function WelcomeBlock() {
  const [authModal, setAuthModal] = useState(false);

  return (
    <>
      <h1 className="text-4xl font-bold mb-6">
        Welcome to the Magical Advent Calendar
      </h1>
      <p className="text-xl mb-8">Unwrap the magic of Christmas every day!</p>
      <button
        onClick={() => setAuthModal(true)}
        className="px-6 py-3 bg-red-500 hover:bg-red-700 text-white rounded-lg text-lg transition duration-300 ease-in-out"
      >
        Start the Adventure
      </button>
      <ModalContainer
        modalIsOpen={authModal}
        setModalClose={() => setAuthModal(false)}
      >
        <p className="text-center">
          We're almost there! Let's get you ready to explore the magic!
        </p>
        <p className="text-center">
          Ask your parent to enter their email address, and we'll send a special
          link to start the adventure!
        </p>
        <Link href={"/Misha"}>Enter</Link>
      </ModalContainer>
    </>
  );
}

export default WelcomeBlock;

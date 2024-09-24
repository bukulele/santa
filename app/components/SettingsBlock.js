"use client";

import React from "react";

function SettingsBlock({ children }) {
  return (
    <div className="bg-white rounded p-4 shadow text-black flex flex-col gap-2 w-96 max-w-full">
      {children}
    </div>
  );
}

export default SettingsBlock;

import React from "react";
import Snowfall from "../components/Snowfall";
import SettingsBlock from "../components/SettingsBlock";
import ChildrenList from "../components/ChildrenList"; // New Client Component

export default function ParentsCorner() {
  return (
    <div className="flex flex-col items-center w-full gap-3 overflow-y-auto p-2">
      <Snowfall />
      <SettingsBlock>
        <div className="w-full flex gap-2">
          <p className="w-1/4 font-bold">Your email:</p>
          <p>test@email.com</p>
        </div>
        <button className="bg-slate-500 hover:bg-slate-300 hover:text-slate-700 p-2 rounded shadow text-white font-bold">
          Change password
        </button>
      </SettingsBlock>
      <SettingsBlock>
        <p className="text-center font-bold">Your children:</p>
        <ChildrenList />
      </SettingsBlock>
    </div>
  );
}

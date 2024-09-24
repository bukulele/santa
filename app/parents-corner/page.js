// src/app/page.js

import React from "react";
import Snowfall from "../components/Snowfall";
import SettingsBlock from "../components/SettingsBlock";
import getRandomNumber from "../functions/getRandomNumber";
import ChildrenTile from "../components/ChildrenTile";

export default function ParentsCorner() {
  const childrenColors = [
    { color: "#f87171", hoverColor: "#ef4444" }, // Red
    { color: "#fb923c", hoverColor: "#f97316" }, // Orange
    { color: "#fbbf24", hoverColor: "#f59e0b" }, // Amber
    { color: "#facc15", hoverColor: "#eab308" }, // Yellow
    { color: "#a3e635", hoverColor: "#84cc16" }, // Lime
    { color: "#4ade80", hoverColor: "#22c55e" }, // Green
    { color: "#34d399", hoverColor: "#10b981" }, // Emerald
    { color: "#2dd4bf", hoverColor: "#14b8a6" }, // Teal
    { color: "#22d3ee", hoverColor: "#06b6d4" }, // Cyan
    { color: "#38bdf8", hoverColor: "#0ea5e9" }, // Sky
    { color: "#60a5fa", hoverColor: "#3b82f6" }, // Blue
    { color: "#818cf8", hoverColor: "#6366f1" }, // Indigo
    { color: "#a78bfa", hoverColor: "#8b5cf6" }, // Violet
    { color: "#c084fc", hoverColor: "#a855f7" }, // Purple
    { color: "#e879f9", hoverColor: "#d946ef" }, // Fuchsia
    { color: "#f472b6", hoverColor: "#ec4899" }, // Pink
    { color: "#fb7185", hoverColor: "#f43f5e" }, // Rose
  ];
  const children = childrenColors;

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
        <div className="flex flex-wrap justify-center gap-1">
          {children.map((_, index) => {
            let colorObjIdx = getRandomNumber(0, childrenColors.length - 1);
            let colorObj = childrenColors[colorObjIdx];
            return (
              <ChildrenTile
                key={`child_tile_${index}`}
                color={colorObj.color}
                hoverColor={colorObj.hoverColor}
              />
            );
          })}
          <button className="w-28 h-28 bg-slate-500 hover:bg-slate-300 hover:text-slate-700 p-2 rounded shadow text-white font-bold">
            Add Child
          </button>
        </div>
      </SettingsBlock>
    </div>
  );
}

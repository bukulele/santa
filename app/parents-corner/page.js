"use client";

import React, { useEffect, useState } from "react";
import Snowfall from "../components/Snowfall";
import SettingsBlock from "../components/SettingsBlock";
import ChildrenList from "../components/ChildrenList"; // New Client Component
import { Switch } from "@/components/ui/switch";
import Task from "../components/Task";
import ModalContainer from "../components/ModalContainer";

export default function ParentsCorner() {
  const [longCalendar, setLongCalendar] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(false);

  useEffect(() => {
    let tasksLength = 24;
    if (!longCalendar) {
      tasksLength = 24;
    } else {
      tasksLength = 31;
    }
    let tasksList = Array.from({ length: tasksLength }).map((task, index) => {
      return <Task key={`task_${index}`} />;
    });

    setTasks(tasksList);
  }, [longCalendar]);

  return (
    <div className="flex flex-col items-center w-full gap-3 overflow-y-auto p-2">
      <Snowfall />
      {passwordEntered && (
        <>
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
          <SettingsBlock>
            <div className="w-full flex justify-end items-center gap-2">
              <p className="m-0">Christmas</p>
              <Switch
                className="data-[state=checked]:bg-green-300"
                checked={longCalendar}
                onCheckedChange={() => setLongCalendar(!longCalendar)}
              />
              <p className="m-0">New Year</p>
            </div>
            <p className="text-center font-bold">Advent calendar tasks:</p>
            {tasks}
          </SettingsBlock>
        </>
      )}
      <ModalContainer modalIsOpen={!passwordEntered}></ModalContainer>
    </div>
  );
}

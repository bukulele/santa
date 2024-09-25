"use client";

import React, { useState } from "react";
import ChildrenTile from "../components/ChildrenTile";
import getRandomNumber from "../functions/getRandomNumber";
import ModalContainer from "./ModalContainer";
import { db, auth } from "@/lib/firebase";
import { doc, setDoc, collection } from "firebase/firestore";

export default function ChildrenList() {
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

  const [children, setChildren] = useState(childrenColors);
  const [showChildModal, setShowChildModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Toggle between create/edit mode
  const [childData, setChildData] = useState({
    avatarSrc: "",
    name: "",
    sex: "male",
  }); // Form data

  const handleAddChild = () => {
    const newChild =
      childrenColors[getRandomNumber(0, childrenColors.length - 1)];
    setChildren([...children, newChild]);
    setIsEditing(false);
    setShowChildModal(true);
  };

  const handleEditChild = (index) => {
    // Here we can populate the form for editing
    const childToEdit = children[index];
    setChildData(childToEdit); // Populate form with existing child data
    setIsEditing(true);
    setShowChildModal(true);
  };

  const handleCloseModal = () => {
    setShowChildModal(false);
    setChildData({ avatarSrc: "", name: "", sex: "male" }); // Reset form data
  };

  const handleSaveChild = async () => {
    // Save child to Firestore
    const user = auth.currentUser;
    if (!user) return;

    const parentDocRef = doc(db, "parents", user.uid);
    const childDocRef = doc(collection(parentDocRef, "children"));

    // Save child data
    await setDoc(childDocRef, {
      avatarSrc: childData.avatarSrc,
      name: childData.name,
      sex: childData.sex,
    });

    // Create 31 tasks in the "tasks" sub-collection
    for (let i = 1; i <= 31; i++) {
      const taskDocRef = doc(collection(childDocRef, "tasks"), `task_${i}`);
      await setDoc(taskDocRef, {
        audioContent: "",
        imageContent: "",
        imageSrc: "",
        status: "locked",
        text: "",
        textContent: "",
        videoContent: "",
      });
    }

    handleCloseModal(); // Close modal after saving
  };

  const handleDeleteChild = async () => {
    // Logic for deleting a child document
    console.log("Delete child");
    handleCloseModal();
  };

  return (
    <div className="flex flex-wrap justify-center gap-1">
      {children.map((colorObj, index) => (
        <ChildrenTile
          key={`child_tile_${index}`}
          color={colorObj.color}
          hoverColor={colorObj.hoverColor}
          onClick={() => handleEditChild(index)}
        />
      ))}
      <button
        onClick={handleAddChild}
        className="w-28 h-28 bg-slate-500 hover:bg-slate-300 hover:text-slate-700 p-2 rounded shadow text-white font-bold"
      >
        Add Child
      </button>
      <ModalContainer modalIsOpen={showChildModal}>
        <form className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-center">
            {isEditing ? "Edit Child" : "Add Child"}
          </h2>
          <input
            type="text"
            placeholder="Avatar URL"
            className="p-2 border rounded"
            value={childData.avatarSrc}
            onChange={(e) =>
              setChildData({ ...childData, avatarSrc: e.target.value })
            }
            required
          />
          <input
            type="text"
            placeholder="Name"
            className="p-2 border rounded"
            value={childData.name}
            onChange={(e) =>
              setChildData({ ...childData, name: e.target.value })
            }
            required
          />
          <div className="flex gap-4">
            <label>
              <input
                type="radio"
                value="male"
                checked={childData.sex === "male"}
                onChange={(e) =>
                  setChildData({ ...childData, sex: e.target.value })
                }
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={childData.sex === "female"}
                onChange={(e) =>
                  setChildData({ ...childData, sex: e.target.value })
                }
              />
              Female
            </label>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              Close
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 rounded"
              onClick={handleSaveChild}
            >
              Save
            </button>
            {isEditing && (
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white py-2 px-4 rounded"
                onClick={handleDeleteChild}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </ModalContainer>
    </div>
  );
}

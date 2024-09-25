"use client";

import React, { useEffect, useState } from "react";
import Snowfall from "../components/Snowfall";
import SettingsBlock from "../components/SettingsBlock";
import ChildrenList from "../components/ChildrenList";
import { Switch } from "@/components/ui/switch";
import Task from "../components/Task";
import ModalContainer from "../components/ModalContainer";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

export default function ParentsCorner() {
  const [longCalendar, setLongCalendar] = useState(false);
  const [tasks, setTasks] = useState(null);
  const [passwordEntered, setPasswordEntered] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [user, setUser] = useState(null);
  const [parentData, setParentData] = useState(null);

  const fetchParentData = async (uid) => {
    try {
      const parentDocRef = doc(db, "parents", uid);
      const parentDoc = await getDoc(parentDocRef);

      if (parentDoc.exists()) {
        const parentData = parentDoc.data();
        console.log(parentData);
        setParentData(parentData);

        // Set calendar length based on fetched data
        setLongCalendar(parentData.calendarLength === 31);

        // Generate tasks based on calendar length
        // generateTasks(parentData.calendarLength);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching parent data:", error);
    }
  };

  useEffect(() => {
    // Firebase Auth listener
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setPasswordEntered(true); // User is logged in
        await fetchParentData(currentUser.uid); // Fetch parent data
      } else {
        setUser(null);
        setPasswordEntered(false); // User is not logged in
      }
    });

    return () => unsubscribe(); // Cleanup the listener on component unmount
  }, []);

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

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (user.emailVerified) {
        setPasswordEntered(true); // Close modal on successful login
        setAuthError(""); // Clear any previous errors
      } else {
        setAuthError("Please verify your email before logging in.");
      }
    } catch (error) {
      setAuthError("Failed to login. Please check your credentials.");
      console.error("Login error:", error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      // Create a document in the "parents" collection with the user's UID
      await setDoc(doc(db, "parents", user.uid), {
        longCalendar: false, // Default value
      });

      setPasswordEntered(false); // Keep the modal open
      setAuthError(""); // Clear any previous errors

      // Show a message to the user indicating they should check their email
      alert(
        "A verification email has been sent to your email address. Please verify your email before logging in."
      );
    } catch (error) {
      setAuthError("Failed to sign up. Please try again.");
      console.error("Sign-up error:", error);
    }
  };

  const handleResendVerification = async () => {
    try {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        await sendEmailVerification(user);
        alert("A verification email has been resent to your email address.");
      }
    } catch (error) {
      console.error("Error resending verification email:", error);
    }
  };

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
      <ModalContainer modalIsOpen={!passwordEntered}>
        <form
          onSubmit={isSigningUp ? handleSignUp : handleLogin}
          className="flex flex-col gap-4"
        >
          <h2 className="text-2xl font-bold text-center">
            {isSigningUp ? "Parent Sign Up" : "Parent Login"}
          </h2>
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {authError && <p className="text-red-500 text-center">{authError}</p>}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {isSigningUp ? "Sign Up" : "Login"}
          </button>
          <p className="text-center">
            {isSigningUp ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-blue-500 underline"
                  onClick={() => setIsSigningUp(false)}
                >
                  Log in
                </button>
              </>
            ) : (
              <>
                Have not signed up yet?{" "}
                <button
                  type="button"
                  className="text-blue-500 underline"
                  onClick={() => setIsSigningUp(true)}
                >
                  Sign up
                </button>
              </>
            )}
          </p>
          {!isSigningUp && (
            <button
              type="button"
              className="text-blue-300 underline mt-2 text-xs"
              onClick={handleResendVerification}
            >
              Resend Verification Email
            </button>
          )}
        </form>
      </ModalContainer>
    </div>
  );
}

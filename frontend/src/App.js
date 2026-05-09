import React, { useState } from "react";
import Patient from "./Patient";
import Staff from "./Staff";

export default function App() {
  const [view, setView] = useState("patient");

  return (
    <div>
      <h1>QuickSched</h1>

      <button onClick={() => setView("patient")}>Patient</button>
      <button onClick={() => setView("staff")}>Staff</button>

      {view === "patient" ? <Patient /> : <Staff />}
    </div>
  );
}

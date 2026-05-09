import React, { useState } from "react";

export default function Patient() {
  const [name, setName] = useState("");
  const [time, setTime] = useState("");

  const book = async () => {
    await fetch("http://localhost:5000/book", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient: name, time }),
    });
  };

  const cancel = async () => {
    await fetch("http://localhost:5000/cancel", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ patient: name, time }),
    });
  };

  return (
    <div>
      <h2>Patient</h2>
      <input placeholder="name" onChange={(e) => setName(e.target.value)} />
      <input placeholder="time" onChange={(e) => setTime(e.target.value)} />

      <button onClick={book}>Book</button>
      <button onClick={cancel}>Cancel</button>
    </div>
  );
}

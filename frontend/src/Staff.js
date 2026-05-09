import React, { useState, useEffect } from "react";

export default function Staff() {
  const [time, setTime] = useState("");
  const [slots, setSlots] = useState({});

  const createSlot = async () => {
    await fetch("http://localhost:5000/slot", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ time }),
    });
    load();
  };

  const load = async () => {
    const res = await fetch("http://localhost:5000/slots");
    const data = await res.json();
    setSlots(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div>
      <h2>Staff</h2>

      <input placeholder="time" onChange={(e) => setTime(e.target.value)} />
      <button onClick={createSlot}>Create Slot</button>

      <h3>All Slots</h3>
      <pre>{JSON.stringify(slots, null, 2)}</pre>
    </div>
  );
}

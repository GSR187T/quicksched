const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let slots = {};
// { "10am": [appointments] }

const MAX_CAPACITY = 5;

// BOOK APPOINTMENT
app.post("/book", (req, res) => {
  const { patient, time } = req.body;

  if (!slots[time]) slots[time] = [];

  if (slots[time].length >= MAX_CAPACITY) {
    return res.status(400).json({ error: "Slot full" });
  }

  const alreadyBooked = Object.values(slots)
    .flat()
    .find((a) => a.patient === patient);

  if (alreadyBooked) {
    return res.status(400).json({ error: "Already booked" });
  }

  slots[time].push({ patient });
  res.json({ message: "Booked successfully" });
});

// CANCEL
app.post("/cancel", (req, res) => {
  const { patient, time } = req.body;

  if (!slots[time]) return res.status(400).json({ error: "No slot found" });

  slots[time] = slots[time].filter((a) => a.patient !== patient);

  res.json({ message: "Cancelled" });
});

// CREATE SLOT
app.post("/slot", (req, res) => {
  const { time } = req.body;

  if (!slots[time]) slots[time] = [];

  res.json({ message: "Slot created" });
});

// GET ALL
app.get("/slots", (req, res) => {
  res.json(slots);
});

app.listen(5000, () => console.log("Backend running on port 5000"));

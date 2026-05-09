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

  if (!patient || !time) {
    return res.status(400).send("Invalid request");
  }

  if (!slots[time]) {
    slots[time] = [];
  }

  if (slots[time].includes(patient)) {
    return res.status(400).send("Already booked");
  }

  if (slots[time].length >= 5) {
    return res.status(400).send("Slot full");
  }

  slots[time].push(patient);

  return res.status(200).send("Booked");
});

// CANCEL
app.post("/cancel", (req, res) => {
  const { patient, time } = req.body;

  if (!patient || !time) {
    return res.status(400).send("Invalid request");
  }

  if (!slots[time]) {
    return res.status(400).send("No slot found");
  }

  const index = slots[time].indexOf(patient);

  if (index === -1) {
    return res.status(400).send("Not found");
  }

  slots[time].splice(index, 1);

  return res.status(200).send("Cancelled");
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

if (require.main === module) {
  app.listen(5000, () => {
    console.log("Backend running on port 5000");
  });
}

module.exports = app;

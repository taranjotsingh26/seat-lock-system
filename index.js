console.log("Seat Lock System Running");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

/* ---------------- SEAT STORAGE ---------------- */

let seats = {
  1: "available",
  2: "available",
  3: "available",
  4: "available",
  5: "available"
};

/* ---------------- HOME ---------------- */

app.get("/", (req, res) => {
  res.send("Seat Lock System API Running 🚀");
});

/* ---------------- VIEW SEATS ---------------- */

app.get("/api/seats", (req, res) => {
  res.json(seats);
});

/* ---------------- LOCK SEAT ---------------- */

app.post("/api/lock/:id", (req, res) => {
  const seatId = req.params.id;

  if (!seats[seatId]) {
    return res.status(404).json({ message: "Seat not found" });
  }

  if (seats[seatId] !== "available") {
    return res.json({ message: "Seat already locked or booked" });
  }

  seats[seatId] = "locked";

  res.json({
    message: `Seat ${seatId} locked successfully`
  });
});

/* ---------------- CONFIRM BOOKING ---------------- */

app.post("/api/book/:id", (req, res) => {
  const seatId = req.params.id;

  if (seats[seatId] !== "locked") {
    return res.json({ message: "Seat must be locked before booking" });
  }

  seats[seatId] = "booked";

  res.json({
    message: `Seat ${seatId} booked successfully`
  });
});

/* ---------------- RELEASE SEAT ---------------- */

app.post("/api/release/:id", (req, res) => {
  const seatId = req.params.id;

  if (!seats[seatId]) {
    return res.status(404).json({ message: "Seat not found" });
  }

  seats[seatId] = "available";

  res.json({
    message: `Seat ${seatId} released`
  });
});

/* ---------------- SERVER ---------------- */

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
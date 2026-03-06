console.log("New deployment running");

import express from "express";
import bookingRoutes from "./booking.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Test route
app.get("/test", (req, res) => {
  res.send("Render deployment working");
});

// Home route
app.get("/", (req, res) => {
  res.send("Seat Lock System API Running 🚀");
});

// Connect booking routes
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
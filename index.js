console.log("New deployment running");

const express = require("express");
const bookingRoutes = require("./booking.route");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/test", (req, res) => {
  res.send("Render deployment working");
});

app.get("/", (req, res) => {
  res.send("Seat Lock System API Running 🚀");
});

// connect booking routes
app.use("/api", bookingRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
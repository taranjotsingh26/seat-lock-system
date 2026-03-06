console.log("New deployment running");

const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

// Test route
app.get("/test", (req, res) => {
  res.send("Render deployment working");
});

// Home route
app.get("/", (req, res) => {
  res.send("Seat Lock System API Running 🚀");
});

// Example API
app.get("/api/products", (req, res) => {
  res.json([
    { name: "Phone", price: 500 },
    { name: "Laptop", price: 1200 }
  ]);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
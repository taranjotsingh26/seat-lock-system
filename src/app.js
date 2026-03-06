import express from "express";
import bookingRoutes from "./modules/booking/booking.route.js";

const app = express();

app.use(express.json());

// API Routes
app.use("/api", bookingRoutes);

// Default route
app.get("/", (req, res) => {
    res.send("Ticket Booking System API Running");
});
app.get("/api/book/:seatId", async (req, res) => {
  const seatId = req.params.seatId;
  res.send(`Demo endpoint working. Use POST to book seat ${seatId}`);
});

export default app;
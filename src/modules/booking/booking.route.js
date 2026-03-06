import express from "express";
import { bookSeatController } from "./booking.controller.js";

const router = express.Router();

// POST route (real booking)
router.post("/book/:seatId", bookSeatController);

// GET route (browser demo)
router.get("/book/:seatId", bookSeatController);

export default router;
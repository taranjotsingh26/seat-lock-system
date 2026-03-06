const express = require("express");
const { bookSeatController } = require("./booking.controller");

const router = express.Router();

router.post("/book/:seatId", bookSeatController);
router.get("/book/:seatId", bookSeatController);

module.exports = router;
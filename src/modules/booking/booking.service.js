import { acquireLock, releaseLock } from "../../utils/lock.util.js";
import { getSeatStatus, bookSeat, seatExists } from "./booking.model.js";

export const bookSeatService = async (seatId) => {
  const lockKey = `lock:seat:${seatId}`;

  const token = await acquireLock(lockKey);

  if (!token) {
    return { status: 423, message: "Seat is currently locked. Try again." };
  }

  try {
    if (!seatExists(seatId)) {
      return { status: 404, message: "Seat not found" };
    }

    const status = getSeatStatus(seatId);

    if (status === "booked") {
      return { status: 400, message: `Seat ${seatId} already booked` };
    }

    bookSeat(seatId);

    return { status: 200, message: `Seat ${seatId} booked successfully` };

  } finally {
    await releaseLock(lockKey, token);
  }
};
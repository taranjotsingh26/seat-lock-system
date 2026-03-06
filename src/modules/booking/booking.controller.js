import { bookSeatService } from "./booking.service.js";

export const bookSeatController = async (req, res) => {
  const { seatId } = req.params;

  const result = await bookSeatService(seatId);

  res.status(result.status).json({
    message: result.message
  });
};
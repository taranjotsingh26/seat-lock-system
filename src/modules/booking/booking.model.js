// In-memory seat storage

const seats = {
  "1": "available",
  "2": "available",
  "3": "available",
  "4": "available",
  "5": "available"
};

export const getSeatStatus = (seatId) => {
  return seats[seatId];
};

export const bookSeat = (seatId) => {
  seats[seatId] = "booked";
};

export const seatExists = (seatId) => {
  return seatId in seats;
};
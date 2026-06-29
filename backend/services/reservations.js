import { enrichRoomTypes } from './rooms.js';
import { calculateStayQuote, parseDateOnly } from './pricing.js';

function datesOverlap(checkIn, checkOut, resCheckIn, resCheckOut) {
  const start = parseDateOnly(checkIn);
  const end = parseDateOnly(checkOut);
  const rStart = parseDateOnly(resCheckIn);
  const rEnd = parseDateOnly(resCheckOut);
  return start < rEnd && end > rStart;
}

export function countOverlappingReservations(roomTypeId, checkIn, checkOut, reservations) {
  return reservations.filter(
    (r) =>
      r.roomTypeId === roomTypeId &&
      r.status !== 'cancelled' &&
      datesOverlap(checkIn, checkOut, r.checkIn, r.checkOut),
  ).length;
}

export function getAvailableUnitsForDates(roomType, checkIn, checkOut, reservations) {
  const overlapping = countOverlappingReservations(roomType.id, checkIn, checkOut, reservations);
  const remaining = roomType.available - overlapping;
  return Math.max(0, remaining);
}

export function buildReservationSearch(roomTypes, checkIn, checkOut, guests, reservations) {
  const guestCount = Number(guests) || 1;

  return roomTypes
    .map((room) => {
      const unitsLeft = getAvailableUnitsForDates(room, checkIn, checkOut, reservations);
      const fitsGuests = guestCount <= room.capacity;
      const quote = calculateStayQuote(room.basePricePerNight, checkIn, checkOut);

      return {
        ...room,
        unitsAvailableForDates: unitsLeft,
        isAvailableForDates: unitsLeft > 0 && fitsGuests,
        unavailableReason:
          !fitsGuests
            ? `Bu oda en fazla ${room.capacity} kişiliktir.`
            : unitsLeft === 0
              ? 'Seçilen tarihlerde müsait oda yok.'
              : null,
        quote,
      };
    })
    .filter((r) => r.quote)
    .sort((a, b) => {
      if (a.isAvailableForDates !== b.isAvailableForDates) {
        return a.isAvailableForDates ? -1 : 1;
      }
      return a.quote.total - b.quote.total;
    });
}

export function enrichRoomTypesWithPricing(roomTypes, checkIn, checkOut, reservations) {
  const enriched = enrichRoomTypes(roomTypes);
  return buildReservationSearch(enriched, checkIn, checkOut, null, reservations);
}

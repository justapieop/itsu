import { Booking } from "../../domain/Booking";

export const BOOKING_REPOSITORY = Symbol("BOOKING_REPOSITORY");

export interface BookingRepository {
  save(booking: Booking): Promise<Booking>
}
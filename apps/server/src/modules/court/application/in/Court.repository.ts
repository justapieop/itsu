import { Court } from "../../domain/Court";

export const COURT_REPOSITORY = Symbol("COURT_REPOSITORY");

export interface CourtRepository {
  save(court: Court): Promise<Court>;
  list(page: number, list: number): Promise<Court[]>;
}
import { Court } from "../../domain/Court";

export interface CourtRepository {
  save(court: Court): Promise<void>;
}
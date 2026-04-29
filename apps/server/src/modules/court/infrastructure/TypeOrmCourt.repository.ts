import { Injectable } from "@nestjs/common";
import { CourtRepository } from "../application/in/Court.repository";
import { Court } from "../domain/Court";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCourtEntity } from "./TypeOrmCourt.entity";
import { Repository } from "typeorm";

@Injectable()
export class TypeOrmCourtRepository implements CourtRepository {
  public constructor(
    @InjectRepository(TypeOrmCourtEntity)
    private readonly courtRepository: Repository<TypeOrmCourtEntity>,
  ) { }
  
  public async save(court: Court): Promise<void> {
    
  }
}
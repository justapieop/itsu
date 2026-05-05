import { Injectable, UseInterceptors } from "@nestjs/common";
import { CourtRepository } from "../../application/in/Court.repository";
import { Court } from "../../domain/Court";
import { InjectRepository } from "@nestjs/typeorm";
import { TypeOrmCourtEntity } from "./TypeOrmCourt.entity";
import { Repository, SelectQueryBuilder } from "typeorm";
import { buildPaginator } from "typeorm-cursor-pagination";
import { CacheInterceptor } from "@nestjs/cache-manager";
import Paginator from "typeorm-cursor-pagination/lib/Paginator";

@Injectable()
export class TypeOrmCourtRepository implements CourtRepository {
  public constructor(
    @InjectRepository(TypeOrmCourtEntity)
    private readonly courtRepository: Repository<TypeOrmCourtEntity>,
  ) { }

  @UseInterceptors(CacheInterceptor)
  public async list(page: number, limit: number): Promise<Court[]> {
    const queryBuilder: SelectQueryBuilder<TypeOrmCourtEntity> = this.courtRepository.createQueryBuilder("court");

    if (page <= 1) {
      const paginator: Paginator<TypeOrmCourtEntity> = buildPaginator({
        entity: TypeOrmCourtEntity,
        paginationKeys: ["id"],
        query: {
          limit,
          order: "DESC",
        }
      });

      const { data } = await paginator.paginate(queryBuilder);
      return data.map(this.mapEntityToDomain);
    }

    const offset: number = (page - 1) * limit;
    const entities: TypeOrmCourtEntity[] = await queryBuilder
      .orderBy("court.id", "DESC")
      .skip(offset)
      .take(limit)
      .getMany();

    return entities.map(this.mapEntityToDomain);
  }

  private mapEntityToDomain(entity: TypeOrmCourtEntity): Court {
    const court = new Court();
    court.id = entity.id;
    court.name = entity.name;
    court.latitude = entity.latitude;
    court.longitude = entity.longitude;
    court.address = entity.address;
    court.createdAt = entity.createdAt;
    court.open = entity.open;
    court.terms = entity.terms;
    court.minHoursPerSession = entity.minHoursPerSession;

    return court;
  }

  public async save(court: Court): Promise<Court> {
    const data: TypeOrmCourtEntity = this.courtRepository.create(court);

    return this.mapEntityToDomain(await this.courtRepository.save(data));
  }
}
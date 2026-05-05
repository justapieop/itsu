import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmCourtEntity } from "./infrastructure/typeorm/TypeOrmCourt.entity";
import { COURT_REPOSITORY } from "./application/in/Court.repository";
import { TypeOrmCourtRepository } from "./infrastructure/typeorm/TypeOrmCourt.repository";
import { KeyStoreModule } from "../keystore/KeyStore.module";
import { CourtController } from "./Court.controller";

@Module({
  imports: [TypeOrmModule.forFeature([TypeOrmCourtEntity]), KeyStoreModule],
  providers: [
    TypeOrmCourtRepository,
    {
      provide: COURT_REPOSITORY,
      useExisting: TypeOrmCourtRepository,
    }
  ],
  exports: [COURT_REPOSITORY],
  controllers: [CourtController],
})
export class CourtModule {}
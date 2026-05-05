import { Body, Controller, Get, Inject, Post, Query } from "@nestjs/common";
import { Court } from "./domain/Court";
import { COURT_REPOSITORY, type CourtRepository } from "./application/in/Court.repository";
import { ApiOkResponse } from "@nestjs/swagger";
import { createListResponseDto } from "../../common/structures/List.response";
import { CourtAddDto } from "./infrastructure/http/CourtAdd.dto";
import { v7 } from "uuid";

@Controller("/courts")
export class CourtController {
  public constructor(
    @Inject(COURT_REPOSITORY)
    private readonly courtRepository: CourtRepository,
  ) {}

  @Get("/")
  @ApiOkResponse({
    description: "List of courts",
    type: createListResponseDto(Court),
  })
  public async getCourts(@Query("page") page: number, @Query("limit") limit: number): Promise<Court[]> {
    const [roundedPage, roundedLimit]: number[] = [Math.floor(page), Math.floor(limit)];

    return await this.courtRepository.list(roundedPage, roundedLimit);
  }

  @Post("/")
  public async addCourt(@Body() body: CourtAddDto): Promise<Court> {
    const court: Court = new Court();

    court.id = v7();


    return await this.courtRepository.save(court);
  }
}
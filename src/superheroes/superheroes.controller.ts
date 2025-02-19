import { Controller, Post, Get, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

/**
 * Controller that handles HTTP requests related to superheroes.
 */
@ApiTags('Superheroes')
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * Handles HTTP POST requests to add a new superhero.
   *
   * @param createSuperheroDto The data for the new superhero.
   * @returns The created superhero.
   */
  @Post()
  @ApiOperation({ summary: 'Add a new superhero' })
  @ApiResponse({ status: 201, description: 'Superhero successfully added.', type: CreateSuperheroDto })
  @ApiResponse({ status: 400, description: 'Bad Request. Duplicate name or invalid humility score.' })
  create(@Body() createSuperheroDto: CreateSuperheroDto): CreateSuperheroDto {
    return this.superheroesService.create(createSuperheroDto);
  }

  /**
   * Handles HTTP GET requests to retrieve all superheroes sorted by humility score.
   *
   * @returns An array of superheroes.
   */
  @Get()
  @ApiOperation({ summary: 'Get all superheroes sorted by humility score' })
  @ApiResponse({ status: 200, description: 'List of superheroes.', type: [CreateSuperheroDto] })
  findAll(): CreateSuperheroDto[] {
    return this.superheroesService.findAll();
  }
}

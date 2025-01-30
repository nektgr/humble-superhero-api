import { Controller, Get, Post, Body } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

/**
 * Controller that exposes superhero-related API endpoints.
 */
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * POST /superheroes
   * Adds a new superhero.
   */
  @Post()
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    this.superheroesService.create(createSuperheroDto);
    return { message: 'Superhero added successfully!' };
  }

  /**
   * GET /superheroes
   * Fetches superheroes, sorted by humility score.
   */
  @Get()
  findAll() {
    return this.superheroesService.findAll();
  }
}

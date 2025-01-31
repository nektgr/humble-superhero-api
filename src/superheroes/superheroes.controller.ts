import { Body, Controller, Get, Post } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

/**
 * Controller handling superhero-related HTTP requests.
 */
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  /**
   * Adds a new superhero.
   * @param superhero The superhero data.
   * @returns The newly created superhero.
   */
  @Post()
  create(@Body() superhero: CreateSuperheroDto): CreateSuperheroDto {
    return this.superheroesService.create(superhero); // ✅ Returns new superhero
  }

  /**
   * Retrieves all superheroes sorted by humility score.
   * @returns The sorted superhero list.
   */
  @Get()
  findAll(): CreateSuperheroDto[] {
    return this.superheroesService.findAll();
  }
}

import { Injectable } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';

/**
 * Service responsible for handling superhero operations.
 */
@Injectable()
export class SuperheroesService {
  private superheroes: CreateSuperheroDto[] = [];

  /**
   * Adds a new superhero to the in-memory database.
   * @param superhero The superhero data.
   */
  create(superhero: CreateSuperheroDto): void {
    this.superheroes.push(superhero);
  }

  /**
   * Retrieves all superheroes, sorted by humility score (highest first).
   * @returns Sorted superhero list.
   */
  findAll(): CreateSuperheroDto[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}

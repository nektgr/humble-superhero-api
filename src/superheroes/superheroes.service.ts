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
   * @returns The newly created superhero.
   */
  create(superhero: CreateSuperheroDto): CreateSuperheroDto {
    this.superheroes.push(superhero);
    return superhero; // ✅ Ensure the new superhero is returned
  }

  /**
   * Retrieves all superheroes, sorted by humility score (highest first).
   * @returns Sorted superhero list.
   */
  findAll(): CreateSuperheroDto[] {
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}

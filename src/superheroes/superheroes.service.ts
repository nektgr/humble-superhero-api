import { Injectable, Logger } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { InvalidHumilityScoreException } from './exceptions/invalid-humility-score.exception';

/**
 * Service responsible for handling superhero operations.
 */
@Injectable()
export class SuperheroesService {
  private superheroes: CreateSuperheroDto[] = [];
  private readonly logger = new Logger(SuperheroesService.name);
  /**
   * Adds a new superhero to the in-memory database.
   * @param superhero The superhero data.
   * @returns The newly created superhero.
   */
  create(superheroDto: CreateSuperheroDto): CreateSuperheroDto {
    this.logger.log(`Adding new superhero: ${superheroDto.name}`);

    if (superheroDto.humilityScore < 1 || superheroDto.humilityScore > 10) {
      this.logger.error('Invalid humility score received.');
      throw new InvalidHumilityScoreException();
    }

    this.superheroes.push(superheroDto);
    this.logger.log(`Successfully added ${superheroDto.name}`);
    return superheroDto; // ✅ Ensure the new superhero is returned
  }
  /**
   * Retrieves all superheroes, sorted by humility score (highest first).
   * @returns Sorted superhero list.
   */
  
  findAll(): CreateSuperheroDto[] {
    this.logger.log('Fetching all superheroes...');
    return this.superheroes.sort((a, b) => b.humilityScore - a.humilityScore);
  }
}

import { Injectable, Logger } from '@nestjs/common';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { InvalidHumilityScoreException } from './exceptions/invalid-humility-score.exception';
import { DuplicateSuperheroException } from './exceptions/duplicate-superhero.exception';

/**
 * Service responsible for handling superhero operations.
 */
@Injectable()
export class SuperheroesService {
  private superheroes: CreateSuperheroDto[] = [];
  private readonly logger = new Logger(SuperheroesService.name);

  /**
   * Adds a new superhero to the in-memory database.
   * @param superheroDto The superhero data.
   * @returns The newly created superhero.
   * @throws DuplicateSuperheroException if the superhero name already exists.
   * @throws InvalidHumilityScoreException if humility score is out of range.
   */
  create(superheroDto: CreateSuperheroDto): CreateSuperheroDto {
    this.logger.log(`Attempting to add superhero: ${superheroDto.name}`);

    // ✅ Prevent duplicate superheroes
    if (this.superheroes.some(hero => hero.name.toLowerCase() === superheroDto.name.toLowerCase())) {
      this.logger.warn(`Duplicate superhero detected: ${superheroDto.name}`);
      throw new DuplicateSuperheroException(superheroDto.name);
    }

    // ✅ Validate humility score (if needed outside DTO)
    if (superheroDto.humilityScore < 1 || superheroDto.humilityScore > 10) {
      this.logger.error(`Invalid humility score received: ${superheroDto.humilityScore}`);
      throw new InvalidHumilityScoreException();
    }

    // ✅ Add superhero to the in-memory database
    this.superheroes.push(superheroDto);
    this.logger.log(`Superhero ${superheroDto.name} added successfully!`);
    
    return superheroDto; // ✅ Return the newly added superhero
  }

  /**
   * Retrieves all superheroes, sorted by humility score (highest first).
   * @returns Sorted list of superheroes.
   */
  findAll(): CreateSuperheroDto[] {
    this.logger.log('Fetching all superheroes...');

    // ✅ Sorting a **copy** to avoid modifying the original array (best practice)
    return [...this.superheroes].sort((a, b) => b.humilityScore - a.humilityScore);
  }
}

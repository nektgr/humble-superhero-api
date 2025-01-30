import { IsInt, IsString, Min, Max } from 'class-validator';

/**
 * DTO (Data Transfer Object) for creating a superhero.
 * Enforces data validation using class-validator.
 */
export class CreateSuperheroDto {
  @IsString()
  name: string;

  @IsString()
  superpower: string;

  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}

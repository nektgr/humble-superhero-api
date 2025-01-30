import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min, Max } from 'class-validator';

/**
 * DTO (Data Transfer Object) for creating a superhero.
 * Enforces data validation using class-validator.
 */
export class CreateSuperheroDto {
  @ApiProperty({ description: 'The name of the superhero', example: 'Captain Humble' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'The superpower of the superhero', example: 'Wisdom' })
  @IsString()
  superpower: string;

  @ApiProperty({ description: 'Humility score (1-10)', example: 9, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1)
  @Max(10)
  humilityScore: number;
}

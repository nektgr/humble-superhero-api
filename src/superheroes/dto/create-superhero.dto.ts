import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, Max, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSuperheroDto {
  @ApiProperty({ description: 'Superhero name', example: 'Captain Kindness' })
  @IsString()
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters.' })
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'Name must contain only letters and numbers.' })
  @Transform(({ value }) => value.trim()) // ✅ Trim spaces
  name: string;

  @ApiProperty({ description: 'Superhero special ability', example: 'Helping others' })
  @IsString()
  @Length(5, 100, { message: 'Superpower must be between 5 and 100 characters.' })
  @Transform(({ value }) => value.trim()) // ✅ Trim spaces
  superpower: string;

  @ApiProperty({ description: 'Humility score (1-10)', example: 9, minimum: 1, maximum: 10 })
  @IsInt({ message: 'Humility score must be an integer.' })
  @Min(1, { message: 'Humility score must be at least 1.' })
  @Max(10, { message: 'Humility score cannot exceed 10.' })
  humilityScore: number;
}

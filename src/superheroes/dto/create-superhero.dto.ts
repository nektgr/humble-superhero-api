// src/superheroes/dto/create-superhero.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsInt, Min, Max, IsString, Length, Matches } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateSuperheroDto {
  @ApiProperty({
    description: 'Superhero name. Must be between 3 and 30 alphanumeric characters.',
    example: 'Captain Kindness',
  })
  @IsString({ message: 'Name must be a string.' })
  @IsNotEmpty({ message: 'Name should not be empty.' })
  @Length(3, 30, { message: 'Name must be between 3 and 30 characters.' })
  @Matches(/^[a-zA-Z0-9\s]+$/, { message: 'Name must contain only letters, numbers, and spaces.' })
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'Superhero special ability. Must be between 3 and 100 characters.',
    example: 'Helping others in need',
  })
  @IsString({ message: 'Superpower must be a string.' })
  @IsNotEmpty({ message: 'Superpower should not be empty.' })
  @Length(3, 100, { message: 'Superpower must be between 3 and 100 characters.' })
  @Transform(({ value }) => value.trim())
  superpower: string;

  @ApiProperty({
    description: 'Humility score representing how humble the superhero is. Must be an integer between 1 and 10.',
    example: 9,
    minimum: 1,
    maximum: 10,
  })
  @IsInt({ message: 'Humility score must be an integer.' })
  @Min(1, { message: 'Humility score must be at least 1.' })
  @Max(10, { message: 'Humility score cannot exceed 10.' })
  humilityScore: number;
}

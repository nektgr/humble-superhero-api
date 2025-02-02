import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsInt, Min, Max, Length } from 'class-validator';

export class CreateSuperheroDto {
  @ApiProperty({ description: 'Superhero name', example: 'Superman' })
  @IsString()
  @Length(2, 50, { message: 'Name must be between 2 and 50 characters.' })
  name: string;

  @ApiProperty({ description: 'Superhero power', example: 'Flight' })
  @IsString()
  @Length(3, 100, { message: 'Superpower must be between 3 and 100 characters.' })
  superpower: string;

  @ApiProperty({ description: 'Humility score (1-10)', example: 9, minimum: 1, maximum: 10 })
  @IsInt()
  @Min(1, { message: 'Humility score must be at least 1' })
  @Max(10, { message: 'Humility score must not exceed 10' })
  humilityScore: number;
}

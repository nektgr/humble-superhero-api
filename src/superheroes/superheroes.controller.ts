import { Controller, Post, Get, Body, BadRequestException } from '@nestjs/common';
import { SuperheroesService } from './superheroes.service';
import { CreateSuperheroDto } from './dto/create-superhero.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Superheroes')
@Controller('superheroes')
export class SuperheroesController {
  constructor(private readonly superheroesService: SuperheroesService) {}

  @Post()
@ApiOperation({ summary: 'Add a new superhero' })
@ApiResponse({ status: 201, description: 'Superhero successfully added.', type: CreateSuperheroDto })
@ApiResponse({ status: 400, description: 'Bad Request. Duplicate name or invalid humility score.' })
async create(@Body() createSuperheroDto: CreateSuperheroDto) {
  try {
    return await this.superheroesService.create(createSuperheroDto);
  } catch (error) {
    throw new BadRequestException({
      statusCode: 400,
      error: "Bad Request",
      message: error.message || "Failed to add superhero", // ✅ Ensures meaningful response
    });
  }
}

  @Get()
  @ApiOperation({ summary: 'Get all superheroes sorted by humility score' })
  @ApiResponse({ status: 200, description: 'List of superheroes.', type: [CreateSuperheroDto] })
  findAll(): CreateSuperheroDto[] {
    return this.superheroesService.findAll();
  }
}

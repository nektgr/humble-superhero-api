import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from '../superheroes.service';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should add a superhero and retrieve them sorted by humility score', () => {
    const hero1: CreateSuperheroDto = { name: 'Hero1', superpower: 'Flying', humilityScore: 5 };
    const hero2: CreateSuperheroDto = { name: 'Hero2', superpower: 'Invisibility', humilityScore: 8 };

    service.create(hero1);
    service.create(hero2);

    const result = service.findAll();
    
    expect(result.length).toBe(2);
    expect(result[0].name).toBe('Hero2'); // Higher humility score first
    expect(result[1].name).toBe('Hero1');
  });
});

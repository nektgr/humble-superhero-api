// src/superheroes/superheroes.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesService } from '../superheroes.service';
import { CreateSuperheroDto } from '../dto/create-superhero.dto';
import { DuplicateSuperheroException } from '../exceptions/duplicate-superhero.exception';
import { InvalidHumilityScoreException } from '../exceptions/invalid-humility-score.exception';

describe('SuperheroesService', () => {
  let service: SuperheroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SuperheroesService],
    }).compile();

    service = module.get<SuperheroesService>(SuperheroesService);
    // Reset internal state before each test if needed
    (service as any).superheroes = [];
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

  it('should throw DuplicateSuperheroException when superhero name already exists', () => {
    const hero: CreateSuperheroDto = { name: 'UniqueHero', superpower: 'Flying', humilityScore: 5 };
    service.create(hero);
    expect(() => service.create(hero)).toThrowError(DuplicateSuperheroException);
  });

  it('should throw InvalidHumilityScoreException for invalid humility score', () => {
    const hero: CreateSuperheroDto = { name: 'InvalidHero', superpower: 'Speed', humilityScore: 11 };
    expect(() => service.create(hero)).toThrowError(InvalidHumilityScoreException);
  });
});

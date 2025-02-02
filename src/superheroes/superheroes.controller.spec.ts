import { Test, TestingModule } from '@nestjs/testing';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

describe('SuperheroesController', () => {
  let controller: SuperheroesController;
  let service: SuperheroesService;

  // Create a simple mock for the SuperheroesService.
  const mockSuperheroesService = {
    create: jest.fn((dto) => dto),
    findAll: jest.fn(() => []),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SuperheroesController],
      providers: [
        {
          provide: SuperheroesService,
          useValue: mockSuperheroesService,
        },
      ],
    }).compile();

    controller = module.get<SuperheroesController>(SuperheroesController);
    service = module.get<SuperheroesService>(SuperheroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  // Optional: You can also add tests that verify controller methods call the service methods.
  it('should call create method of SuperheroesService', async () => {
    const dto = { name: 'TestHero', superpower: 'Flying', humilityScore: 7 };
    controller.create(dto);
    expect(service.create).toHaveBeenCalledWith(dto);
  });

  it('should call findAll method of SuperheroesService', () => {
    controller.findAll();
    expect(service.findAll).toHaveBeenCalled();
  });
});

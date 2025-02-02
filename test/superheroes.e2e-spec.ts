// test/superheroes.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';

describe('SuperheroesController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    // Use global validation and exception filter
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/superheroes (POST) creates a superhero', async () => {
    const hero = { name: 'HeroTest', superpower: 'Flying', humilityScore: 7 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(201);
    expect(response.body.name).toBe(hero.name);
  });

  it('/superheroes (POST) fails on duplicate superhero', async () => {
    const hero = { name: 'DuplicateHero', superpower: 'Invisibility', humilityScore: 8 };
    // First creation should succeed
    await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(201);

    // Second creation should fail with conflict (HTTP 409)
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(409);
    expect(response.body.errorMessage).toMatch(/already exists/);
  });

  it('/superheroes (POST) fails on invalid humility score', async () => {
    const hero = { name: 'InvalidHero', superpower: 'Speed', humilityScore: 11 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toBeDefined();
  });

  it('/superheroes (GET) returns superheroes sorted by humility score', async () => {
    // Create two superheroes with different humility scores
    const hero1 = { name: 'SortHero1', superpower: 'Flying', humilityScore: 3 };
    const hero2 = { name: 'SortHero2', superpower: 'Strength', humilityScore: 9 };
    
    // Create new entries
    await request(app.getHttpServer()).post('/superheroes').send(hero1).expect(201);
    await request(app.getHttpServer()).post('/superheroes').send(hero2).expect(201);

    // Retrieve and validate the sorted order
    const response = await request(app.getHttpServer()).get('/superheroes').expect(200);
    expect(response.body[0].humilityScore).toBeGreaterThanOrEqual(response.body[1].humilityScore);
  });
});

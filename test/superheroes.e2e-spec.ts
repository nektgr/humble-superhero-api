// test/superheroes.e2e-spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { HttpExceptionFilter } from '../src/filters/http-exception.filter';

describe('SuperheroesController (E2E)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    // Set up the same global validation and exception handling as in production
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
    app.useGlobalFilters(new HttpExceptionFilter());

    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/superheroes (POST) - creates a superhero', async () => {
    const hero = { name: 'HeroTest', superpower: 'Flying', humilityScore: 7 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(201);
    expect(response.body.name).toBe(hero.name);
  });

  it('/superheroes (POST) - fails on duplicate superhero', async () => {
    const hero = { name: 'DuplicateHero', superpower: 'Invisibility', humilityScore: 8 };
    // Create the superhero for the first time
    await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(201);
  
    // Second attempt should return a conflict error (HTTP 409)
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(409);
  
    // Since duplicate error returns a string, simply check the string for the expected message.
    expect(response.body.errorMessage).toMatch(/already exists/);
  });
  it('/superheroes (POST) - fails on invalid humility score below minimum', async () => {
    const hero = { name: 'HeroLow', superpower: 'Speed', humilityScore: 0 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toEqual(
      expect.arrayContaining([expect.stringMatching(/at least 1/)])
    );
  });

  it('/superheroes (POST) - fails on invalid humility score above maximum', async () => {
    const hero = { name: 'HeroHigh', superpower: 'Strength', humilityScore: 11 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toEqual(
      expect.arrayContaining([expect.stringMatching(/cannot exceed 10/)])
    );
  });

  it('/superheroes (POST) - fails on invalid name with special characters', async () => {
    const hero = { name: 'Invalid@Name', superpower: 'Flying', humilityScore: 5 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toEqual(
      expect.arrayContaining([expect.stringMatching(/only letters, numbers, and spaces/)])
    );
  });

  it('/superheroes (POST) - fails on empty name', async () => {
    const hero = { name: '', superpower: 'Flying', humilityScore: 5 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toEqual(
      expect.arrayContaining([expect.stringMatching(/should not be empty/)])
    );
  });

  it('/superheroes (POST) - fails on empty superpower', async () => {
    const hero = { name: 'ValidName', superpower: '', humilityScore: 5 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(400);
    expect(response.body.errorMessage).toEqual(
      expect.arrayContaining([expect.stringMatching(/should not be empty/)])
    );
  });

  it('/superheroes (POST) - trims extra spaces in name and superpower', async () => {
    const hero = { name: '  TrimTest  ', superpower: '  Invisibility  ', humilityScore: 5 };
    const response = await request(app.getHttpServer())
      .post('/superheroes')
      .send(hero)
      .expect(201);
    expect(response.body.name).toBe('TrimTest');
    expect(response.body.superpower).toBe('Invisibility');
  });

  it('/superheroes (GET) - returns superheroes sorted by humility score', async () => {
    // Create two superheroes with different humility scores
    const hero1 = { name: 'SortHero1', superpower: 'Flying', humilityScore: 3 };
    const hero2 = { name: 'SortHero2', superpower: 'Strength', humilityScore: 9 };

    await request(app.getHttpServer()).post('/superheroes').send(hero1).expect(201);
    await request(app.getHttpServer()).post('/superheroes').send(hero2).expect(201);

    const response = await request(app.getHttpServer()).get('/superheroes').expect(200);
    // Expect the hero with the higher humility score to be first
    expect(response.body[0].humilityScore).toBeGreaterThanOrEqual(response.body[1].humilityScore);
  });
});

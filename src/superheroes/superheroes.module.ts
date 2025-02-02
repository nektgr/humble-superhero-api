import { Module } from '@nestjs/common';
import { SuperheroesController } from './superheroes.controller';
import { SuperheroesService } from './superheroes.service';

/**
 * Module that groups all superheroes-related components together.
 */
@Module({
  controllers: [SuperheroesController],
  providers: [SuperheroesService],
  exports: [SuperheroesService], // Allows the service to be reused in other modules if needed
})
export class SuperheroesModule {}

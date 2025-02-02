import { BadRequestException } from '@nestjs/common';

export class InvalidHumilityScoreException extends BadRequestException {
  constructor() {
    super('Humility score must be between 1 and 10.');
  }
}

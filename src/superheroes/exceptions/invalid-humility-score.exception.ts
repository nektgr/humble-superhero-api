import { BadRequestException } from '@nestjs/common';

/**
 * Exception thrown when an invalid humility score is provided.
 */
export class InvalidHumilityScoreException extends BadRequestException {
  /**
   * Creates a new instance of InvalidHumilityScoreException.
   */
  constructor() {
    super('Humility score must be between 1 and 10.');
  }
}

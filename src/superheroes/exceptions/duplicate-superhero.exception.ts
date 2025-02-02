import { ConflictException } from '@nestjs/common';

/**
 * Exception thrown when attempting to create a superhero with a name that already exists.
 */
export class DuplicateSuperheroException extends ConflictException {
  /**
   * Creates a new instance of DuplicateSuperheroException.
   *
   * @param name The name of the duplicate superhero.
   */
  constructor(name: string) {
    super(`Superhero with name "${name}" already exists.`);
  }
}

import { ConflictException } from '@nestjs/common';

export class DuplicateSuperheroException extends ConflictException {
  constructor(name: string) {
    super(`Superhero with name "${name}" already exists.`);
  }
}

import { BaseEntity } from './BaseEntity';
import { Level } from './Level';
import { Attachment } from './Attachment';

export class Subtopic extends BaseEntity {
  level: Level;
  done = false;
  attachments: Attachment[];

  toString(): string {
    return `level[${this.name}]`;
  }

}

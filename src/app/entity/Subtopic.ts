import { BaseEntity } from './BaseEntity';
import { Level } from './Level';
import { Attachment } from './Attachment';

export class Subtopic extends BaseEntity {
  level: Level;
  checked: boolean;
  attachments: Attachment[];

  toString(): string {
    return `level[${this.name}]`;
  }

}

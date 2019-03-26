import { BaseEntity } from './BaseEntity';
import { Level } from './Level';

export class Subtopic extends BaseEntity {
  level: Level;
  checked: boolean;
}

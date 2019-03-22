import { BaseEntity } from './BaseEntity';
import { Level } from './Level';

export class Lesson extends BaseEntity {
  level: Level;
  checked: boolean;
}

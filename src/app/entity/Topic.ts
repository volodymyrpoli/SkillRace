import { BaseEntity } from './BaseEntity';
import { Lesson } from './Lesson';

export class Topic extends BaseEntity {
  lessons: Lesson[] = [];
}

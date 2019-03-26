import { BaseEntity } from './BaseEntity';
import { Subtopic } from './Subtopic';

export class Topic extends BaseEntity {
  subtopics: Subtopic[] = [];
}

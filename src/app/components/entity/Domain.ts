import { Topic } from './Topic';
import { BaseEntity } from './BaseEntity';

export class Domain extends BaseEntity {
  // color: number;
  topics: Topic[];
}

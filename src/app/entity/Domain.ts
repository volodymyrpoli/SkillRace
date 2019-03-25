import { Topic } from './Topic';
import { BaseEntity } from './BaseEntity';

export class Domain extends BaseEntity {
  topics: Topic[];
  order: number;

  constructor(id: number, name: string, order: number) {
    super(id, name);
    this.order = order;
  }
}

import { Topic } from './Topic';
import { BaseEntity } from './BaseEntity';

export class Domain extends BaseEntity {
  topics: Topic[];
  rank: number;

  constructor(id: number, name: string, order: number) {
    super(id, name);
    this.rank = order;
    this.topics = [];
  }

  toString(): string {
    return 'domain[' + name + ']';
  }
}

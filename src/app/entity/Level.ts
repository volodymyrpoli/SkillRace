import { BaseEntity } from './BaseEntity';

export class Level extends BaseEntity {
  rank: number;
  color: string;

  constructor(id: number, name: string, order: number, color: string) {
    super(id, name);
    this.rank = order;
    this.color = color;
  }

  toString(): string {
    return `level[${this.name}]`;
  }

}

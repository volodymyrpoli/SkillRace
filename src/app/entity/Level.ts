import { BaseEntity } from './BaseEntity';

export class Level extends BaseEntity {
  order: number;
  color: string;

  constructor(id: number, name: string, order: number, color: string) {
    super(id, name);
    this.order = order;
    this.color = color;
  }

  toString(): string {
    return `level[${this.name}]`;
  }
}

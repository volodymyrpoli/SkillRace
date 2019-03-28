import { BaseEntity } from './BaseEntity';

export class Attachment extends BaseEntity {

  public url: string;

  constructor(id: number = null, name: string = null, url: string) {
    super(id, name);
    this.url = url;
  }
}

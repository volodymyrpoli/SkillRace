import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Attachment } from '../entity/Attachment';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AttachmentRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'attachments';

  constructor(private httpClient: HttpClient) { }

  create(name: string, url: string, subtopicId: number): Observable<Attachment> {
    return this.httpClient.post<Attachment>(`${this.BASE_URL}/${this.COLLECTIONS}`, { name, url, subtopicId });
  }

  getAll(): Observable<Attachment[]> {
    return this.httpClient.get<Attachment[]>(`${this.BASE_URL}/${this.COLLECTIONS}`);
  }

  delete(id: number) {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Topic } from '../entity/Topic';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TopicRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'topics';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Topic[]> {
    return this.httpClient.get<Topic[]>(`${this.BASE_URL}/${this.COLLECTIONS}`);
  }

  create(name: string, domainId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.BASE_URL}/${this.COLLECTIONS}`, { name, domainId });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subtopic } from '../entity/Subtopic';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubtopicRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'subtopics';

  constructor(private httpClient: HttpClient) { }

  changeName(id: number, name: string): Observable<Subtopic> {
    return this.httpClient.patch<Subtopic>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`, { name });
  }

  changeLevel(id: number, levelId: number): Observable<Subtopic> {
    return this.httpClient.patch<Subtopic>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`, { levelId });
  }

  getAll(): Observable<Subtopic[]> {
    return this.httpClient.get<Subtopic[]>(`${this.BASE_URL}/${this.COLLECTIONS}`);
  }

  create(name: string, topicId: number, levelId: number): Observable<Subtopic> {
    return this.httpClient.post<Subtopic>(`${this.BASE_URL}/${this.COLLECTIONS}`, { name, topicId, levelId });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`);
  }
}

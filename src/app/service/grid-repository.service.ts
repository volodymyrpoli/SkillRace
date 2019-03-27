import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from '../entity/Domain';
import { Level } from '../entity/Level';
import { Topic } from '../entity/Topic';
import { Subtopic } from '../entity/Subtopic';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GridRepositoryService {

  private BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  getDomains(): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(`${this.BASE_URL}/domains`);
  }

  getLevels(): Observable<Level[]> {
    return this.httpClient.get<Level[]>(`${this.BASE_URL}/levels`);
  }

  createDomain(name: string): Observable<Domain> {
    return this.httpClient.post<Domain>(`${this.BASE_URL}/domains`, { name });
  }

  createTopic(name: string, domainId: number): Observable<Topic> {
    return this.httpClient.post<Topic>(`${this.BASE_URL}/topics`, { name, domainId });
  }

  createSubtopic(name: string, levelId: number, topicId: number): Observable<Subtopic> {
    return this.httpClient.post<Subtopic>(`${this.BASE_URL}/subtopics`, { name, levelId, topicId });
  }

  deleteElement(id: number, entityPath: string) {
    this.httpClient.delete(`${this.BASE_URL}/${entityPath}/${id}`).subscribe();
  }

}

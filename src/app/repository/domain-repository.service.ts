import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Domain } from '../entity/Domain';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DomainRepositoryService {

  private BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) {
  }

  getDomains(): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(`${this.BASE_URL}/domains`);
  }

  createDomain(name: string): Observable<Domain> {
    return this.httpClient.post<Domain>(`${this.BASE_URL}/domains`, { name });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/domains/${id}`);
  }
}

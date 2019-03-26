import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Domain } from '../entity/Domain';
import { Level } from '../entity/Level';

@Injectable({
  providedIn: 'root'
})
export class GridRepositoryService {

  private BASE_URL = 'http://localhost:8080';

  constructor(private httpClient: HttpClient) {
  }

  getDomains(): Observable<Domain[]> {
    return this.httpClient.get<Domain[]>(`${this.BASE_URL}/domains`);
  }

  getLevels(): Observable<Level[]> {
    return this.httpClient.get<Level[]>(`${this.BASE_URL}/levels`);
  }

}

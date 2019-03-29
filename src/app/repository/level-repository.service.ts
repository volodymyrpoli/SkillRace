import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Level } from '../entity/Level';

@Injectable({
  providedIn: 'root'
})
export class LevelRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'levels';

  constructor(private httpClient: HttpClient) { }

  getAll(): Observable<Level[]> {
    return this.httpClient.get<Level[]>(`${this.BASE_URL}/${this.COLLECTIONS}`);
  }

  create(name: string, color: string): Observable<Level> {
    return this.httpClient.post<Level>(`${this.BASE_URL}/${this.COLLECTIONS}`, { name, color });
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`);
  }
}

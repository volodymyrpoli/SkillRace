import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subtopic } from '../entity/Subtopic';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DoneRepositoryService {

  private BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  public changeStatus(subtopicId: number, status: boolean): Observable<Subtopic> {
    return this.httpClient.patch<Subtopic>(`${this.BASE_URL}/done/${subtopicId}`, { status });
  }
}

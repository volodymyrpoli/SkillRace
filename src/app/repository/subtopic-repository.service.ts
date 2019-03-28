import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subtopic } from '../entity/Subtopic';
import { environment } from '../../environments/environment';
import { Level } from '../entity/Level';
import { Attachment } from '../entity/Attachment';

@Injectable({
  providedIn: 'root'
})
export class SubtopicRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'subtopics';

  constructor(private httpClint: HttpClient) { }

  changeName(id: number, name: string): Observable<Subtopic> {
    return this.httpClint.patch<Subtopic>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`, { name });
  }

  changeLevel(id: number, levelId: number): Observable<Subtopic> {
    return this.httpClint.patch<Subtopic>(`${this.BASE_URL}/${this.COLLECTIONS}/${id}`, { levelId });
  }
}

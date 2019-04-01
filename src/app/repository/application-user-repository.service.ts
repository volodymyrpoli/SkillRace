import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApplicationUser } from '../entity/ApplicationUser';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserRepositoryService {

  private BASE_URL = environment.BASE_URL;
  private COLLECTIONS = 'attachments';

  constructor(private httpClient: HttpClient) { }

  getAllUser(): Observable<ApplicationUser> {
    return this.httpClient.get<ApplicationUser>(`${this.BASE_URL}/${this.COLLECTIONS}`);
  }
}

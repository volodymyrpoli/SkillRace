import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = environment.BASE_URL;

  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<{token: string}> {
    return this.httpClient.post<{token: string}>(`${this.BASE_URL}/auth`, { username, password });
  }
}

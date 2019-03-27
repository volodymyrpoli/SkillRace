import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  token = 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b2xvZHlteXIiLCJleHAiOjE1NTQyOTYwMzAsImlhdCI6MTU1MzY5MTIzMH0.mmJfOLbrD7bQsBqkXg77U8vninRuLQpQmsYnfuqOKDFDow_U-mHQES4k5XhfUYbL4aVngeNEXJ6R4pRp4RuWaQ';

  ngOnInit(): void {
    // localStorage.setItem('currentUser', JSON.stringify({ token: this.token }));
    console.dir(this.parseJwt(this.token));
  }

  parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  };
}

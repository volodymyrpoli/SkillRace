import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    localStorage.setItem('currentUser', JSON.stringify({ token: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ2b2xvZHlteXIiLCJleHAiOjE1NTQyOTYwMzAsImlhdCI6MTU1MzY5MTIzMH0.mmJfOLbrD7bQsBqkXg77U8vninRuLQpQmsYnfuqOKDFDow_U-mHQES4k5XhfUYbL4aVngeNEXJ6R4pRp4RuWaQ' }));
  }

}

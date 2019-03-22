import { Component, OnInit } from '@angular/core';
import { KanbanGrid } from './components/entity/KanbanGrid';
import { Level } from './components/entity/Level';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  static lastId = 0;

  grid: KanbanGrid;

  static getId() {
    return this.lastId++;
  }

  ngOnInit(): void {
    const student = new Level(AppComponent.getId(), 'Student', 1, 'skyblue');
    const intern = new Level(AppComponent.getId(), 'Intern', 2, 'yellowgreen');
    const junior = new Level(AppComponent.getId(), 'Junior', 3, 'gold');
    this.grid = {
      levels: [
        student, intern, junior
      ],
      domains: [
        {
          id: AppComponent.getId(),
          name: 'Front-end',
          order: 2,
          topics: [
            {
              id: AppComponent.getId(),
              name: 'CSS',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'Animation',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: AppComponent.getId(),
              name: 'HTML',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'DOM',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: AppComponent.getId(),
              name: 'JavaScript',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'Async',
                  checked: false,
                  level: junior
                }
              ]
            },
          ]
        },
        {
          id: AppComponent.getId(),
          name: 'Back-end',
          order: 1,
          topics: [
            {
              id: AppComponent.getId(),
              name: 'Java',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'For loop',
                  checked: true,
                  level: student
                },
                {
                  id: AppComponent.getId(),
                  name: 'While loop',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: AppComponent.getId(),
              name: 'Spring',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'Dependency injection',
                  checked: false,
                  level: intern
                },
                {
                  id: AppComponent.getId(),
                  name: 'JPA',
                  checked: false,
                  level: intern
                },
                {
                  id: AppComponent.getId(),
                  name: 'Hibernate',
                  checked: false,
                  level: intern
                },
                {
                  id: AppComponent.getId(),
                  name: 'Auth0',
                  checked: true,
                  level: junior
                },
              ]
            },
          ]
        },
      ]
    };
  }


}

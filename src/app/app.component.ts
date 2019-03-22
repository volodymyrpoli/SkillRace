import { Component, OnInit } from '@angular/core';
import { KanbanGrid } from './components/entity/KanbanGrid';

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
    this.grid = {
      levels: [
        {
          id: 1,
          order: 1,
          name: 'Basic'
        },
        {
          id: 2,
          order: 2,
          name: 'Junior'
        },
        {
          id: 3,
          order: 3,
          name: 'Senior'
        },
      ],
      domains: [
        {
          id: AppComponent.getId(),
          name: 'Front-end',
          topics: [
            {
              id: AppComponent.getId(),
              name: 'CSS',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'Animate',
                  checked: true,
                  level: {
                    id: 1,
                    order: 1,
                    name: 'Basic'
                  }
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
                  level: {
                    id: 1,
                    order: 1,
                    name: 'Basic'
                  }
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
                  level: {
                    id: 3,
                    order: 1,
                    name: 'Basic'
                  }
                }
              ]
            },
          ]
        },
        {
          id: AppComponent.getId(),
          name: 'Back-end',
          topics: [
            {
              id: AppComponent.getId(),
              name: 'Java',
              lessons: [
                {
                  id: AppComponent.getId(),
                  name: 'Animate',
                  checked: true,
                  level: {
                    id: 2,
                    order: 1,
                    name: 'Junior'
                  }
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
                  level: {
                    id: 2,
                    order: 1,
                    name: 'Junior'
                  }
                },
                {
                  id: AppComponent.getId(),
                  name: 'JPA',
                  checked: true,
                  level: {
                    id: 1,
                    order: 1,
                    name: 'Basic'
                  }
                },
                {
                  id: AppComponent.getId(),
                  name: 'Hibernate',
                  checked: false,
                  level: {
                    id: 1,
                    order: 1,
                    name: 'Basic'
                  }
                },
              ]
            },
          ]
        },
      ]
    };
  }


}

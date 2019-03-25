import { Component, OnInit } from '@angular/core';
import { KanbanGrid } from '../../../entity/KanbanGrid';
import { Level } from '../../../entity/Level';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.css']
})
export class UserContainerComponent implements OnInit {

  static lastId = 0;

  grid: KanbanGrid;

  static getId() {
    return this.lastId++;
  }

  ngOnInit(): void {
    const student = new Level(UserContainerComponent.getId(), 'Student', 1, 'skyblue');
    const intern = new Level(UserContainerComponent.getId(), 'Intern', 2, 'yellowgreen');
    const junior = new Level(UserContainerComponent.getId(), 'Junior', 3, 'gold');
    this.grid = {
      levels: [
        student, intern, junior
      ],
      domains: [
        {
          id: UserContainerComponent.getId(),
          name: 'Front-end',
          order: 2,
          topics: [
            {
              id: UserContainerComponent.getId(),
              name: 'CSS',
              lessons: [
                {
                  id: UserContainerComponent.getId(),
                  name: 'Animation',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: UserContainerComponent.getId(),
              name: 'HTML',
              lessons: [
                {
                  id: UserContainerComponent.getId(),
                  name: 'DOM',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: UserContainerComponent.getId(),
              name: 'JavaScript',
              lessons: [
                {
                  id: UserContainerComponent.getId(),
                  name: 'Async',
                  checked: false,
                  level: junior
                }
              ]
            },
          ]
        },
        {
          id: UserContainerComponent.getId(),
          name: 'Back-end',
          order: 1,
          topics: [
            {
              id: UserContainerComponent.getId(),
              name: 'Java',
              lessons: [
                {
                  id: UserContainerComponent.getId(),
                  name: 'For loop',
                  checked: true,
                  level: student
                },
                {
                  id: UserContainerComponent.getId(),
                  name: 'While loop',
                  checked: true,
                  level: student
                }
              ]
            },
            {
              id: UserContainerComponent.getId(),
              name: 'Spring',
              lessons: [
                {
                  id: UserContainerComponent.getId(),
                  name: 'Dependency injection',
                  checked: false,
                  level: intern
                },
                {
                  id: UserContainerComponent.getId(),
                  name: 'JPA',
                  checked: false,
                  level: intern
                },
                {
                  id: UserContainerComponent.getId(),
                  name: 'Hibernate',
                  checked: false,
                  level: intern
                },
                {
                  id: UserContainerComponent.getId(),
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

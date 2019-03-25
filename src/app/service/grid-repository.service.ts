import { Injectable } from '@angular/core';
import { KanbanGrid } from '../entity/KanbanGrid';
import { Level } from '../entity/Level';

@Injectable({
  providedIn: 'root'
})
export class GridRepositoryService {
  static lastId = 0;

  grid: KanbanGrid;

  static getId() {
    return this.lastId++;
  }

  constructor() {
    const student = new Level(GridRepositoryService.getId(), 'Student', 1, 'skyblue');
    const intern = new Level(GridRepositoryService.getId(), 'Intern', 2, 'yellowgreen');
    const junior = new Level(GridRepositoryService.getId(), 'Junior', 3, 'gold');
    const middle = new Level(GridRepositoryService.getId(), 'Middle', 3, 'orange');
    const senior = new Level(GridRepositoryService.getId(), 'Senior', 3, 'indianred');
    const frontend =  {
      id: GridRepositoryService.getId(),
      name: 'Front-end',
      order: 2,
      topics: [
        {
          id: GridRepositoryService.getId(),
          name: 'CSS',
          lessons: [
            {
              id: GridRepositoryService.getId(),
              name: 'Animation',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridRepositoryService.getId(),
          name: 'HTML',
          lessons: [
            {
              id: GridRepositoryService.getId(),
              name: 'DOM',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridRepositoryService.getId(),
          name: 'JavaScript',
          lessons: [
            {
              id: GridRepositoryService.getId(),
              name: 'Async',
              checked: false,
              level: junior
            }
          ]
        },
      ]
    };
    const backend = {
      id: GridRepositoryService.getId(),
      name: 'Back-end',
      order: 1,
      topics: [
        {
          id: GridRepositoryService.getId(),
          name: 'Java',
          lessons: [
            {
              id: GridRepositoryService.getId(),
              name: 'For loop',
              checked: true,
              level: student
            },
            {
              id: GridRepositoryService.getId(),
              name: 'While loop',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridRepositoryService.getId(),
          name: 'Spring',
          lessons: [
            {
              id: GridRepositoryService.getId(),
              name: 'Dependency injection',
              checked: false,
              level: intern
            },
            {
              id: GridRepositoryService.getId(),
              name: 'JPA',
              checked: false,
              level: intern
            },
            {
              id: GridRepositoryService.getId(),
              name: 'Hibernate',
              checked: false,
              level: intern
            },
            {
              id: GridRepositoryService.getId(),
              name: 'Auth0',
              checked: true,
              level: junior
            },
          ]
        },
      ]
    };
    this.grid = {
      levels: [
        student, intern, junior, middle, senior
      ],
      domains: [
        frontend,
        backend,
        backend,
        backend,
      ]
    };
  }

  getGrid() {
    return this.grid;
  }
}

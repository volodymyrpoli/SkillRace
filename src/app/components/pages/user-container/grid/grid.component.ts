import { Component, OnInit } from '@angular/core';
import { KanbanGrid } from '../../../../entity/KanbanGrid';
import { Level } from '../../../../entity/Level';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  static lastId = 0;

  grid: KanbanGrid;

  static getId() {
    return this.lastId++;
  }

  ngOnInit(): void {
    const student = new Level(GridComponent.getId(), 'Student', 1, 'skyblue');
    const intern = new Level(GridComponent.getId(), 'Intern', 2, 'yellowgreen');
    const junior = new Level(GridComponent.getId(), 'Junior', 3, 'gold');
    const middle = new Level(GridComponent.getId(), 'Middle', 3, 'orange');
    const senior = new Level(GridComponent.getId(), 'Senior', 3, 'indianred');
    const frontend =  {
      id: GridComponent.getId(),
      name: 'Front-end',
      order: 2,
      topics: [
        {
          id: GridComponent.getId(),
          name: 'CSS',
          lessons: [
            {
              id: GridComponent.getId(),
              name: 'Animation',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridComponent.getId(),
          name: 'HTML',
          lessons: [
            {
              id: GridComponent.getId(),
              name: 'DOM',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridComponent.getId(),
          name: 'JavaScript',
          lessons: [
            {
              id: GridComponent.getId(),
              name: 'Async',
              checked: false,
              level: junior
            }
          ]
        },
      ]
    };
    const backend = {
      id: GridComponent.getId(),
      name: 'Back-end',
      order: 1,
      topics: [
        {
          id: GridComponent.getId(),
          name: 'Java',
          lessons: [
            {
              id: GridComponent.getId(),
              name: 'For loop',
              checked: true,
              level: student
            },
            {
              id: GridComponent.getId(),
              name: 'While loop',
              checked: true,
              level: student
            }
          ]
        },
        {
          id: GridComponent.getId(),
          name: 'Spring',
          lessons: [
            {
              id: GridComponent.getId(),
              name: 'Dependency injection',
              checked: false,
              level: intern
            },
            {
              id: GridComponent.getId(),
              name: 'JPA',
              checked: false,
              level: intern
            },
            {
              id: GridComponent.getId(),
              name: 'Hibernate',
              checked: false,
              level: intern
            },
            {
              id: GridComponent.getId(),
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
}

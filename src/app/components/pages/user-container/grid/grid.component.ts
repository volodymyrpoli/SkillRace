import { Component, OnInit } from '@angular/core';
import { KanbanGrid } from '../../../../entity/KanbanGrid';
import { GridRepositoryService } from '../../../../service/grid-repository.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit(): void {
  }

  getGrid(): KanbanGrid {
    return this.gridRepository.getGrid();
  }
}

import {Component, Input, OnInit} from '@angular/core';
import { KanbanGrid } from '../../../entity/KanbanGrid';

@Component({
  selector: 'app-kanban-grid',
  templateUrl: './kanban-grid.component.html',
  styleUrls: ['./kanban-grid.component.css']
})
export class KanbanGridComponent implements OnInit {

  @Input() grid: KanbanGrid;

  constructor() { }

  ngOnInit() {
  }

}

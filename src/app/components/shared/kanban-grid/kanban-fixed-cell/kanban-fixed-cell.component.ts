import { Component, Input, OnInit } from '@angular/core';
import { Domain } from '../../../entity/Domain';

@Component({
  selector: 'app-kanban-fixed-cell',
  templateUrl: './kanban-fixed-cell.component.html',
  styleUrls: ['./kanban-fixed-cell.component.css']
})
export class KanbanFixedCellComponent implements OnInit {

  @Input() domain: Domain;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-kanban-header-cell',
  templateUrl: './kanban-header-cell.component.html',
  styleUrls: ['./kanban-header-cell.component.css']
})
export class KanbanHeaderCellComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {
  }

}

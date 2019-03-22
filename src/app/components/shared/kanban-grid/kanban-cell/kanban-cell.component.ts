import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../../../entity/Topic';
import { Level } from '../../../entity/Level';

@Component({
  selector: 'app-kanban-cell',
  templateUrl: './kanban-cell.component.html',
  styleUrls: ['./kanban-cell.component.css']
})
export class KanbanCellComponent implements OnInit {

  @Input() topics: Topic[];
  @Input() level: Level;

  constructor() { }

  ngOnInit() {
  }

}

import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { Level } from '../../../entity/Level';

@Component({
  selector: 'app-kanban-header-cell',
  templateUrl: './kanban-header-cell.component.html',
  styleUrls: ['./kanban-header-cell.component.css']
})
export class KanbanHeaderCellComponent implements OnInit, AfterViewInit {

  @Input() level: Level;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
  }

}

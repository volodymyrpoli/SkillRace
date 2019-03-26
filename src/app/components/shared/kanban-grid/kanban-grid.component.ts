import { Component, Input, OnInit } from '@angular/core';
import { Domain } from '../../../entity/Domain';
import { Level } from '../../../entity/Level';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-kanban-grid',
  templateUrl: './kanban-grid.component.html',
  styleUrls: ['./kanban-grid.component.css']
})
export class KanbanGridComponent implements OnInit {

  @Input() domains$: Observable<Domain[]>;
  @Input() levels$: Observable<Level[]>;

  constructor() {
  }

  ngOnInit() {
  }

}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseEntity } from '../../../../entity/BaseEntity';

@Component({
  selector: 'app-grid-editor-cell',
  templateUrl: './grid-editor-cell.component.html',
  styleUrls: ['./grid-editor-cell.component.css']
})
export class GridEditorCellComponent implements OnInit {

  @Input() item: BaseEntity;
  @Input() selected: boolean;
  @Output() select = new EventEmitter<BaseEntity>();

  constructor() { }

  ngOnInit() {
  }

  click(event: Event): void {
    this.select.emit(this.item);
  }
}

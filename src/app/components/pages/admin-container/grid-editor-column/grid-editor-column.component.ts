import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BaseEntity } from '../../../../entity/BaseEntity';

@Component({
  selector: 'app-grid-editor-column',
  templateUrl: './grid-editor-column.component.html',
  styleUrls: ['./grid-editor-column.component.css']
})
export class GridEditorColumnComponent implements OnInit {

  @Input() category: string;
  @Input() items: BaseEntity[];
  @Input() selectedItem: BaseEntity;
  @Output() select = new EventEmitter<{item: BaseEntity, category: string}>();

  constructor() { }

  ngOnInit() {
  }

  selectItem(baseEntity: BaseEntity) {
    this.select.emit({ item: baseEntity, category: this.category });
  }
}

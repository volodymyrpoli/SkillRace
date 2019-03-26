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
  @Input() withBadge = false;
  @Input() getDataForBadge: (item: BaseEntity) => { color: string, name: string};

  @Output() select = new EventEmitter<BaseEntity>();
  @Output() createItem = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  selectItem(baseEntity: BaseEntity) {
    this.select.emit(baseEntity);
  }

  createItemClick() {
    const name = prompt('Add title');
    this.createItem.emit(name);
  }
}

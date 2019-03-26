import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { KanbanGrid } from '../../../../entity/KanbanGrid';
import { BaseEntity } from '../../../../entity/BaseEntity';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  dataController: any;

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit() {
    const lesson = {
      selected: this.getGrid().domains[0].topics[0].lessons[0],
      all: this.getGrid().domains[0].topics[0].lessons,
      next: null
    };
    const topic = {
      selected: this.getGrid().domains[0].topics[0],
      all: this.getGrid().domains[0].topics,
      next: lesson
    };
    const domain = {
      selected: this.getGrid().domains[0],
      all: this.getGrid().domains,
      next: topic
    };
    this.dataController = { domain, topic, lesson };
  }

  getCategories(): string[] {
    return Object.keys(this.dataController);
  }

  getGrid(): KanbanGrid {
    return this.gridRepository.getGrid();
  }

  getByCategory(category: string): BaseEntity[] {
    return this.dataController[category].all;
  }

  getSelectedByCategory(category: string): BaseEntity {
    return this.dataController[category].selected;
  }

  setSelectedByCategory(category: string, item: BaseEntity) {
    this.dataController[category].selected = item;
  }

  selectItem(item: {item: BaseEntity, category: string}) {
    this.setSelectedByCategory(item.category, item.item);
  }
}

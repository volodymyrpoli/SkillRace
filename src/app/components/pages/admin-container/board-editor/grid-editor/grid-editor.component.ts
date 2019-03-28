import { Component, OnInit } from '@angular/core';
import { Domain } from '../../../../../entity/Domain';
import { Topic } from '../../../../../entity/Topic';
import { Subtopic } from '../../../../../entity/Subtopic';
import { BaseEntity } from '../../../../../entity/BaseEntity';
import { Observable } from 'rxjs';
import { Level } from '../../../../../entity/Level';
import { MatDialog } from '@angular/material';
import { EditCellComponent } from '../../edit-cell/edit-cell.component';
import { GridService } from '../../../../../service/grid.service';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private gridService: GridService) { }

  ngOnInit() {
    this.gridService.load();
  }

  getSelectedDomain(): Observable<Domain> {
    return this.gridService.selectedDomain$;
  }

  getSelectedTopic(): Observable<Topic> {
    return this.gridService.selectedTopic$;
  }

  getSelectedSubtopic(): Observable<Subtopic> {
    return this.gridService.selectedSubtopic$;
  }

  getLevels(): Observable<Level[]> {
    return this.gridService.levels$;
  }

  getItemsForDomain(): Observable<Domain[]> {
    return this.gridService.domains$;
  }

  getItemsForTopic(): Observable<Topic[]> {
    return this.gridService.topics$;
  }

  getItemsForSubtopic(): Observable<Subtopic[]> {
    return this.gridService.subtopics$;
  }

  selectDomain(value: BaseEntity) {
    this.gridService.selectDomain(value as Domain);
    this.gridService.selectTopic(null);
    this.gridService.selectSubtopic(null);
  }

  selectTopic(value: BaseEntity) {
    this.gridService.selectTopic(value as Topic);
    this.gridService.selectSubtopic(null);
  }

  selectSubtopic(value: BaseEntity) {
    this.gridService.selectSubtopic(value as Subtopic);
  }

  createDomain(event: { name: string }) {
    this.gridService.createDomain(event.name);
  }

  createTopic(event: { name: string }) {
    this.gridService.selectedDomain$
      .subscribe(domain => {
        this.gridService.createTopic(event.name, domain.id);
      }).unsubscribe();
  }

  createSubtopic(event: { name: string, levelId: number }) {
    this.gridService.selectedTopic$
      .subscribe(topic => {
        this.gridService.createSubtopic(event.name , topic.id, event.levelId);
      }).unsubscribe();
  }

  getDataForBadge(item: BaseEntity): { color: string, name: string} {
    const lesson = (item as Subtopic);
    if (lesson.level) {
      return { color: lesson.level.color, name: lesson.level.name };
    }
    return { color: 'transparent', name: '' };
  }

  deleteDomain(domain: BaseEntity) {
    this.gridService.deleteDomain(domain as Domain);
  }

  deleteTopic(topic: BaseEntity) {
    this.gridService.deleteTopic(topic as Topic);
  }

  deleteSubtopic(subtopic: BaseEntity) {
    this.gridService.deleteSubtopic(subtopic as Subtopic);
  }

  editSubtopic(baseEntity: BaseEntity) {
    this.dialog.open(EditCellComponent, {
      width: '600px',
      data: baseEntity
    });
  }
}

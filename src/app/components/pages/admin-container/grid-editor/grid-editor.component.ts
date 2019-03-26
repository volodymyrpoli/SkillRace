import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Domain } from '../../../../entity/Domain';
import { Topic } from '../../../../entity/Topic';
import { Lesson } from '../../../../entity/Lesson';
import { BaseEntity } from '../../../../entity/BaseEntity';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  selectedDomain: Domain;
  selectedTopic: Topic;
  selectedLesson: Lesson;

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit() {
    this.selectedDomain = this.gridRepository.getGrid().domains[0];
    this.selectedTopic = this.selectedDomain.topics[0];
    this.selectedLesson = this.selectedTopic.lessons[0];
  }

  getItemsForDomain() {
    return this.gridRepository.getGrid().domains;
  }

  getItemsForTopic() {
    return this.selectedDomain.topics;
  }

  getItemsForLesson() {
    if (this.selectedTopic) {
      return this.selectedTopic.lessons;
    }
    return null;
  }

  selectDomain(value: BaseEntity) {
    this.selectedDomain = value as Domain;
    this.selectedTopic = null;
    this.selectedLesson = null;
  }

  selectTopic(value: BaseEntity) {
    this.selectedTopic = value as Topic;
    this.selectedLesson = null;
  }

  selectLesson(value: BaseEntity) {
    this.selectedLesson = value as Lesson;
  }

  createDomain(name: string) {
    const domain = new Domain(null, name, 0);
    this.getItemsForDomain().push(domain);
    this.selectDomain(domain);
  }

  createTopic(name: string) {
    const topic = new Topic(null, name);
    this.getItemsForTopic().push(topic);
    this.selectTopic(topic);
  }

  createLesson(name: string) {
    const lesson = new Lesson(null, name);
    this.getItemsForLesson().push(lesson);
    this.selectLesson(lesson);
  }

  getDataForBadge(item: BaseEntity): { color: string, name: string} {
    const lesson = (item as Lesson);
    if (lesson.level) {
      return { color: lesson.level.color, name: lesson.level.name };
    }
    return { color: 'transparent', name: '' };
  }
}

import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Domain } from '../../../../entity/Domain';
import { Topic } from '../../../../entity/Topic';
import { Subtopic } from '../../../../entity/Subtopic';
import { BaseEntity } from '../../../../entity/BaseEntity';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  selectedDomain: Domain;
  selectedTopic: Topic;
  selectedSubtopic: Subtopic;

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit() {
    this.selectedDomain = this.gridRepository.getGrid().domains[0];
    this.selectedTopic = this.selectedDomain.topics[0];
    this.selectedSubtopic = this.selectedTopic.subtopics[0];
  }

  getItemsForDomain() {
    return this.gridRepository.getGrid().domains;
  }

  getItemsForTopic() {
    return this.selectedDomain.topics;
  }

  getItemsForSubtopic() {
    if (this.selectedTopic) {
      return this.selectedTopic.subtopics;
    }
    return null;
  }

  selectDomain(value: BaseEntity) {
    this.selectedDomain = value as Domain;
    this.selectedTopic = null;
    this.selectedSubtopic = null;
  }

  selectTopic(value: BaseEntity) {
    this.selectedTopic = value as Topic;
    this.selectedSubtopic = null;
  }

  selectSubtopic(value: BaseEntity) {
    this.selectedSubtopic = value as Subtopic;
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

  createSubtopic(name: string) {
    const lesson = new Subtopic(null, name);
    this.getItemsForSubtopic().push(lesson);
    this.selectSubtopic(lesson);
  }

  getDataForBadge(item: BaseEntity): { color: string, name: string} {
    const lesson = (item as Subtopic);
    if (lesson.level) {
      return { color: lesson.level.color, name: lesson.level.name };
    }
    return { color: 'transparent', name: '' };
  }
}

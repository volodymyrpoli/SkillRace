import { Component, Input, OnInit } from '@angular/core';
import { Domain } from '../../../../entity/Domain';
import { Level } from '../../../../entity/Level';
import { Topic } from '../../../../entity/Topic';

@Component({
  selector: 'app-kanban-row',
  templateUrl: './kanban-row.component.html',
  styleUrls: ['./kanban-row.component.css']
})
export class KanbanRowComponent implements OnInit {

  @Input() domain: Domain;
  @Input() levels: Level[];

  constructor() { }

  ngOnInit() {
  }

  getTopicsWithLessonsFor(level: Level): Topic[] {
    let topics = this.domain.topics.slice();
    topics = topics
      .filter(topic => topic.lessons.some(lesson => lesson.level.id === level.id))
      .map(topic => {
        const t = new Topic();
        t.id = topic.id;
        t.name = topic.name;
        t.lessons = topic.lessons.filter(lessons => lessons.level.id === level.id);
        return t;
      });
    return topics;
  }
}

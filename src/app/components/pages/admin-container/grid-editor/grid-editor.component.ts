import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Domain } from '../../../../entity/Domain';
import { Topic } from '../../../../entity/Topic';
import { Subtopic } from '../../../../entity/Subtopic';
import { BaseEntity } from '../../../../entity/BaseEntity';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  selectedDomain$: Subject<Domain> = new Subject();
  selectedTopic$: Subject<Topic> = new Subject();
  selectedSubtopic$: Subject<Subtopic> = new Subject();
  domains$: Subject<Domain[]> = new Subject();
  topics$: Subject<Topic[]> = new Subject();
  subtopics$: Subject<Subtopic[]> = new Subject();

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit() {
    this.gridRepository.getDomains().subscribe(
      domains => {
        this.domains$.next(domains);
        if (domains.length > 0) {
          this.selectedDomain$.next(domains[0]);
        }
      }
    );

    this.selectedDomain$.subscribe(
      domains => this.topics$.next(domains.topics)
    );

    this.selectedTopic$.subscribe(
      topics => {
        this.subtopics$.next(topics ? topics.subtopics : null);
      }
    );
  }

  getItemsForDomain(): Observable<Domain[]> {
    return this.domains$;
  }

  getItemsForTopic(): Observable<Topic[]> {
    return this.topics$;
  }

  getItemsForSubtopic(): Observable<Subtopic[]> {
    return this.subtopics$;
  }

  selectDomain(value: BaseEntity) {
    this.selectedDomain$.next(value as Domain);
    this.selectedTopic$.next(null);
    this.selectedSubtopic$.next(null);
  }

  selectTopic(value: BaseEntity) {
    this.selectedTopic$.next(value as Topic);
    this.selectedSubtopic$.next(null);
  }

  selectSubtopic(value: BaseEntity) {
    this.selectedSubtopic$.next(value as Subtopic);
  }

  createDomain(name: string) {
    alert('Need implementation');
    const domain = new Domain(null, name, 0);
    // this.getItemsForDomain().push(domain);
    this.selectDomain(domain);
  }

  createTopic(name: string) {
    alert('Need implementation');
    const topic = new Topic(null, name);
    // this.getItemsForTopic().push(topic);
    this.selectTopic(topic);
  }

  createSubtopic(name: string) {
    alert('Need implementation');
    const lesson = new Subtopic(null, name);
    // this.getItemsForSubtopic().push(lesson);
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

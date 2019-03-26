import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Domain } from '../../../../entity/Domain';
import { Topic } from '../../../../entity/Topic';
import { Subtopic } from '../../../../entity/Subtopic';
import { BaseEntity } from '../../../../entity/BaseEntity';
import { Observable, Subject } from 'rxjs';
import { Level } from '../../../../entity/Level';

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
  levels$: Subject<Level[]> = new Subject();

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

    this.gridRepository.getLevels().subscribe(
      levels => this.levels$.next(levels)
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

  createDomain(event: Event) {

  }

  createTopic(event: Event) {

  }

  createSubtopic(event: Event) {

  }

  getDataForBadge(item: BaseEntity): { color: string, name: string} {
    const lesson = (item as Subtopic);
    if (lesson.level) {
      return { color: lesson.level.color, name: lesson.level.name };
    }
    return { color: 'transparent', name: '' };
  }
}

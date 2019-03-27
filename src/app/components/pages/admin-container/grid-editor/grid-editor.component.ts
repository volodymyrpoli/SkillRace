import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Domain } from '../../../../entity/Domain';
import { Topic } from '../../../../entity/Topic';
import { Subtopic } from '../../../../entity/Subtopic';
import { BaseEntity } from '../../../../entity/BaseEntity';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Level } from '../../../../entity/Level';

@Component({
  selector: 'app-grid-editor',
  templateUrl: './grid-editor.component.html',
  styleUrls: ['./grid-editor.component.css']
})
export class GridEditorComponent implements OnInit {

  selectedDomain$: BehaviorSubject<Domain> = new BehaviorSubject(null);
  selectedTopic$: BehaviorSubject<Topic> = new BehaviorSubject(null);
  selectedSubtopic$: BehaviorSubject<Subtopic> = new BehaviorSubject(null);
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
      domains => {
        this.topics$.next(domains ? domains.topics : null);
      }
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

  createDomain(event: { name: string }) {
    this.gridRepository.createDomain(event.name).subscribe(
      domain => alert(JSON.stringify(domain))
    );
  }

  createTopic(event: { name: string }) {
    this.selectedDomain$.subscribe(domain => {
      this.gridRepository.createTopic(event.name, domain.id).subscribe(
        topic => alert(JSON.stringify(topic))
      );
    }).unsubscribe();
  }

  createSubtopic(event: { name: string, levelId: number }) {
    this.selectedTopic$.subscribe(topic => {
      this.gridRepository.createSubtopic(event.name, event.levelId, topic.id).subscribe(
        subtopic => alert(JSON.stringify(subtopic))
      );
    }).unsubscribe();
  }

  getDataForBadge(item: BaseEntity): { color: string, name: string} {
    const lesson = (item as Subtopic);
    if (lesson.level) {
      return { color: lesson.level.color, name: lesson.level.name };
    }
    return { color: 'transparent', name: '' };
  }
}

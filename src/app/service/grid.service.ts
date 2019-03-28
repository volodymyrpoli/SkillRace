import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GridEvent } from '../entity/GridEvent';
import { Utils } from '../utils/Utils';
import { Domain } from '../entity/Domain';
import { DomainRepositoryService } from '../repository/domain-repository.service';
import { Topic } from '../entity/Topic';
import { Subtopic } from '../entity/Subtopic';
import { TopicRepositoryService } from '../repository/topic-repository.service';
import { SubtopicRepositoryService } from '../repository/subtopic-repository.service';
import { Level } from '../entity/Level';
import { LevelRepositoryService } from '../repository/level-repository.service';

@Injectable({
  providedIn: 'root'
})
export class GridService {

  public readonly domains$ = new BehaviorSubject<Domain[]>([]);
  public readonly topics$ = new BehaviorSubject<Topic[]>([]);
  public readonly subtopics$ = new BehaviorSubject<Subtopic[]>([]);
  public readonly levels$ = new BehaviorSubject<Level[]>([]);

  public readonly selectedDomain$ = new BehaviorSubject<Domain>(null);
  public readonly selectedTopic$ = new BehaviorSubject<Topic>(null);
  public readonly selectedSubtopic$ = new BehaviorSubject<Subtopic>(null);

  private domainsHandler$ = new Subject<GridEvent>();
  private topicsHandler$ = new Subject<GridEvent>();
  private subtopicsHandler$ = new Subject<GridEvent>();
  private levelsHandler$ = new Subject<GridEvent>();

  constructor(private domainRepository: DomainRepositoryService,
              private topicRepository: TopicRepositoryService,
              private subtopicRepository: SubtopicRepositoryService,
              private levelRepository: LevelRepositoryService) {
    this.domainsHandler$ = Utils.createEventHandlerForBehavior<Domain>(this.domains$);
    this.topicsHandler$ = Utils.createEventHandlerForBehavior<Topic>(this.topics$);
    this.subtopicsHandler$ = Utils.createEventHandlerForBehavior<Subtopic>(this.subtopics$);
    this.levelsHandler$ = Utils.createEventHandlerForBehavior<Level>(this.levels$);
  }

  load() {
    this.domainRepository.getDomains()
      .subscribe(domains => {
        this.domainsHandler$.next(new GridEvent(
          'LOAD_ALL_DOMAINS',
          domains,
          Utils.replace
        ));
      });
    this.loadLevels();
  }

  loadLevels() {
    this.levelRepository.getAll()
      .subscribe(levels => {
        this.levelsHandler$.next(new GridEvent(
          'LOAD_ALL_LEVELS', levels, Utils.replace
        ));
      });
  }

  createDomain(name: string) {
    this.domainRepository.createDomain(name)
      .subscribe(domain => {
        this.domainsHandler$.next(new GridEvent(
          `CREATE_DOMAIN WITH ID [${domain.id}]`, domain, Utils.add
        ));
      });
  }

  createTopic(name: string, domainId: number) {
    this.topicRepository.create(name, domainId)
      .subscribe(topic => {
        this.topicsHandler$.next(new GridEvent(
          'CREATE_TOPIC', topic, Utils.add
        ));
      });
  }

  createSubtopic(name: string, topicId: number, levelId: number) {
    this.subtopicRepository.create(name, topicId, levelId)
      .subscribe(subtopic => {
        this.subtopicsHandler$.next(new GridEvent(
          'CREATE_SUBTOPIC', subtopic, Utils.add
        ));
      });
  }

  deleteDomain(domain: Domain) {
    this.domainRepository.delete(domain.id)
      .subscribe(() => {
        this.domainsHandler$.next(new GridEvent(
          `DELETE_DOMAIN WITH ID [${domain.id}]`, domain, Utils.remove
        ));
      });
  }

  deleteTopic(topic: Topic) {
    this.topicRepository.delete(topic.id)
      .subscribe(() => {
        this.topicsHandler$.next(new GridEvent(
          `DELETE_TOPIC WITH ID [${topic.id}]`, topic, Utils.remove
        ));
      });
  }

  deleteSubtopic(subtopic: Subtopic) {
    this.subtopicRepository.delete(subtopic.id)
      .subscribe(() => {
        this.subtopicsHandler$.next(new GridEvent(
          `DELETE_SUBTOPIC WITH ID [${subtopic.id}]`, subtopic, Utils.remove
        ));
      });
  }

  selectDomain(domain: Domain) {
    this.selectedDomain$.next(domain);
    this.topicsHandler$.next(new GridEvent(
      'CHANGE_TOPICS', domain.topics, Utils.replace
    ));
  }

  selectTopic(topic: Topic) {
    this.selectedTopic$.next(topic);
    this.subtopicsHandler$.next(new GridEvent(
      'CHANGE_SUBTOPICS', topic ? topic.subtopics : null, Utils.replace
    ));
  }

  selectSubtopic(subtopic: Subtopic) {
    this.selectedSubtopic$.next(subtopic);
  }

  changeSubtopicName(subtopic: Subtopic, name: string) {
    this.subtopicRepository.changeName(subtopic.id, name)
      .subscribe(newSubtopic => {
        this.subtopicsHandler$.next(new GridEvent(
          'CHANGE_SUBTOPIC_NAME',
          { newSubtopic, name },
          (acc, payload: { newSubtopic: Subtopic, name: string }) => {
            acc
              .filter(item => item.id === payload.newSubtopic.id)
              .map(item => item.name = payload.name);
            return acc;
          }
        ));
      });
  }

  changeSubtopicLevel(subtopic: Subtopic, level: Level) {
    this.subtopicRepository.changeLevel(subtopic.id, level.id)
      .subscribe(newSubtopic => {
        this.subtopicsHandler$.next(new GridEvent(
          'CHANGE_SUBTOPIC_LEVEL',
          { newSubtopic },
          (acc, payload: { newSubtopic: Subtopic }) => {
            acc
              .filter(item => item.id === payload.newSubtopic.id)
              .map(item => item.level = payload.newSubtopic.level);
            return acc;
          }
        ));
      });
  }
}

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
import { Attachment } from '../entity/Attachment';
import { AttachmentRepositoryService } from '../repository/attachment-repository.service';
import { BaseEntity } from '../entity/BaseEntity';
import { DoneRepositoryService } from '../repository/done-repository.service';

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
              private levelRepository: LevelRepositoryService,
              private attachmentRepository: AttachmentRepositoryService,
              private doneRepository: DoneRepositoryService) {
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

  clear() {
    this.domainsHandler$.next(new GridEvent(
      'REMOVE_ALL_DOMAINS', [], Utils.replace
    ));
    this.topicsHandler$.next(new GridEvent(
      'REMOVE_ALL_TOPICS', [], Utils.replace
    ));
    this.subtopicsHandler$.next(new GridEvent(
      'REMOVE_ALL_SUBTOPICS', [], Utils.replace
    ));
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

  changeDomainName(domain: BaseEntity, name: string) {
    this.domainRepository.changeName(domain.id, name)
      .subscribe((newDomain: Domain) => {
        this.domainsHandler$.next(new GridEvent(
          'CHANGE_DOMAIN_NAME',
          { id: newDomain.id, value: newDomain.name, field: 'name' },
          Utils.replaceField
        ));
      });
  }

  changeTopicName(topic: BaseEntity, name: string) {
    this.topicRepository.changeName(topic.id, name)
      .subscribe((newTopic: Topic) => {
        this.topicsHandler$.next(new GridEvent(
          'CHANGE_TOPIC_NAME',
          { id: newTopic.id, value: newTopic.name, filed: 'name' },
          Utils.replaceField
        ));
      });
  }

  changeSubtopicName(subtopic: Subtopic, name: string) {
    this.subtopicRepository.changeName(subtopic.id, name)
      .subscribe(newSubtopic => {
        this.subtopicsHandler$.next(new GridEvent(
          'CHANGE_SUBTOPIC_NAME',
          { id: newSubtopic.id, value: newSubtopic.name, field: 'name' },
          Utils.replaceField
        ));
      });
  }

  changeSubtopicLevel(subtopic: Subtopic, level: Level) {
    this.subtopicRepository.changeLevel(subtopic.id, level.id)
      .subscribe(newSubtopic => {
        this.subtopicsHandler$.next(new GridEvent(
          'CHANGE_SUBTOPIC_LEVEL',
          { id: newSubtopic.id, value: newSubtopic.level, field: 'level' },
          Utils.replaceField
        ));
      });
  }

  attachLinkForSubtopic(subtopic: Subtopic, attachment: Attachment) {
    this.attachmentRepository.create(attachment.name, attachment.url, subtopic.id)
      .subscribe(newAttachment => {
        this.subtopicsHandler$.next(new GridEvent(
          'ADD_ATTACHMENT',
          { subtopic, attachment: newAttachment },
          (acc, payload) => {
            acc
              .filter(item => item.id === payload.subtopic.id)
              .map(item => item.attachments.push(payload.attachment));
            return acc;
          }
        ));
      });
  }

  createLevel(name: string, color: string) {
    this.levelRepository.create(name, color)
      .subscribe(
        value => {
          this.levelsHandler$.next(new GridEvent(
            'CREATE_LEVEL', value, Utils.add
          ));
        }
      );
  }

  deleteAttachment(attachment: Attachment, subtopic: Subtopic) {
    this.attachmentRepository.delete(attachment.id)
      .subscribe(() => {
        this.subtopicsHandler$.next(new GridEvent(
          'DELETE_ATTACHMENT', { attachmentId: attachment.id, subtopicId: subtopic.id },
          (acc, payload) => {
            acc
              .filter(item => item.id === payload.subtopicId)
              .map((item: Subtopic) => {
                item.attachments = item.attachments.filter(value1 => value1.id !== payload.attachmentId);
              });
            return acc;
          }
        ));
      });
  }

  changeDoneStatus(topic: Topic, subtopic: Subtopic, status: boolean) {
    this.doneRepository.changeStatus(subtopic.id, status)
      .subscribe((subtopicWithDone) => {
        this.domainsHandler$.next(new GridEvent(
          'CHANGE_STATUS', { topic, subtopicWithDone, status },
          (acc, payload) => {
            const foundDomain: Domain = acc
              .find((domain: Domain) => domain.topics.some(topicItem => topicItem.id === payload.topic.id));
            foundDomain.topics
              .filter((topicItem: Topic) => topicItem.id === payload.topic.id)
              .map(topicItem => {
                topicItem.subtopics
                  .filter((subtopicItem: Subtopic) => subtopicItem.id === subtopic.id)
                  .map((subtopicItem: Subtopic) => {
                    subtopicItem.done = payload.subtopicWithDone.done;
                  });
              });
            return acc;
          }
        ));
      });
  }
}

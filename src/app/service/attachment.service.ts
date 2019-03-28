import { Injectable } from '@angular/core';
import { AttachmentRepositoryService } from '../repository/attachment-repository.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Attachment } from '../entity/Attachment';
import { GridEvent } from '../entity/GridEvent';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class AttachmentService {

  public readonly attachments$ = new BehaviorSubject<Attachment[]>([]);
  private attachmentHandler$ = new Subject<GridEvent>();

  constructor(private attachmentRepository: AttachmentRepositoryService) {
    this.attachmentHandler$ = Utils.createEventHandlerForBehavior<Attachment>(this.attachments$);
  }

  load() {
    this.attachmentRepository.getAll()
      .subscribe(attachments => {
        this.attachmentHandler$.next(new GridEvent(
          'LOAD_ALL_ATTACHMENTS',
          attachments,
          (acc, payload) => payload
        ));
      });
  }
}

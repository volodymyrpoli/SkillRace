import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { GridEvent } from '../entity/GridEvent';
import { Utils } from '../utils/Utils';
import { Domain } from '../entity/Domain';
import { DomainRepositoryService } from '../repository/domain-repository.service';

@Injectable({
  providedIn: 'root'
})
export class DomainService {

  public readonly domains$ = new BehaviorSubject<Domain[]>([]);
  private domainsHandler$ = new Subject<GridEvent>();

  constructor(private domainRepository: DomainRepositoryService) {
    this.domainsHandler$ = Utils.createEventHandlerForBehavior<Domain>(this.domains$);
  }

  load() {
    this.domainRepository.getDomains()
      .subscribe(domains => {
        this.domainsHandler$.next(new GridEvent(
          'LOAD_ALL_ATTACHMENTS',
          domains,
          (acc, payload) => payload
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

  deleteDomain(domain: Domain) {
    this.domainRepository.delete(domain.id)
      .subscribe(() => {
        this.domainsHandler$.next(new GridEvent(
          `DELETE_DOMAIN WITH ID [${domain.id}]`, domain, Utils.remove
        ));
      });
  }
}

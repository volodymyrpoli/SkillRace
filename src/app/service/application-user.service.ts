import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApplicationUserRepositoryService } from '../repository/application-user-repository.service';
import { Utils } from '../utils/Utils';

@Injectable({
  providedIn: 'root'
})
export class ApplicationUserService {

  public readonly applicationUsers$ = new BehaviorSubject([]);
  private readonly applicationUsersHandler$;

  constructor(private applicationUserRepository: ApplicationUserRepositoryService) {
    this.applicationUsersHandler$ = Utils.createEventHandlerForBehavior(this.applicationUsersHandler$);
  }

  load() {
    this.applicationUserRepository.getAllUser()
  }
}

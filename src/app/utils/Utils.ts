import { BehaviorSubject, Subject } from 'rxjs';
import { GridEvent } from '../entity/GridEvent';
import { scan } from 'rxjs/operators';
import { BaseEntity } from '../entity/BaseEntity';
import { Subtopic } from '../entity/Subtopic';

export class Utils {

  static parseJwt(token: string) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  }

  static isCurrentUserAdmin() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const roles = currentUser.detail.role as { authority: string }[];
    return roles.some(role => {
      if (role.authority === 'ROLE_ADMIN') {
        return true;
      }
    });
  }

  static createEventHandler<T>(subject: Subject<T[]>): Subject<GridEvent> {
    const observable = new Subject<GridEvent>();
    observable.pipe(
      scan((acc: T[], event: GridEvent): T[] => {
        console.log(event.type);
        return event.handler(acc, event.payload);
      }, [])
    ).subscribe(item => {
      subject.next(item);
    });
    return observable;
  }

  static createEventHandlerForBehavior<T>(subject: BehaviorSubject<T[]>): Subject<GridEvent> {
    const observable = new Subject<GridEvent>();
    observable.pipe(
      scan((acc: T[], event: GridEvent): T[] => {
        console.log(event.type);
        return event.handler(acc, event.payload);
      }, [])
    ).subscribe(item => {
      subject.next(item);
    });
    return observable;
  }

  static replace(acc: any[], payload: any): any[] {
    return payload;
  }

  static add(acc: any[], payload: any): any[] {
    if (acc && acc.push) {
      acc.push(payload);
    } else {
      acc = [payload];
    }
    return acc;
  }

  static remove(acc: BaseEntity[], payload: BaseEntity): any[] {
    return acc.filter(item => item !== payload);
  }

  static replaceField(acc, payload: { id: number, value: any, field: string }): any[] {
    acc
      .filter(item => item.id === payload.id)
      .map(item => item[payload.field] = payload.value);
    return acc;
  }

}

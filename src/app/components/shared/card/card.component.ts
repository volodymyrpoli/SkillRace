import {Component, OnInit} from '@angular/core';
import {BehaviorSubject, Subject} from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  constructor() { }

  static text = 'CSS Git JavaScript Animation HTML Java Spring Hibernate SQL Linux Terminal OS DOM Tag MultiThread LESS SCSS Angular TypeScript Async RxJS Closer';
  static arr = CardComponent.text.replace(/,/g, '').split(' ');

  static getWord() {
    return CardComponent.arr[Math.floor(Math.random() * CardComponent.arr.length)];
  }

  ngOnInit() {
  }

  getRandomCheck() {
    return Math.random() > .5;
  }

  getText(num: number) {
    let line = '';
    for (let i = 0; i < num; i++) {
      line += CardComponent.getWord() + ' ';
    }
    return line.trim().replace(/(\b\w)/gi, substring => substring.toUpperCase());
  }
}

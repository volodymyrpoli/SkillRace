import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../../../entity/Topic';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() topic: Topic;

  cardColor: string;

  constructor() { }

  ngOnInit() {
    if (this.topic.subtopics[0]) {
      this.cardColor = this.topic.subtopics[0].level.color;
    }
  }

}

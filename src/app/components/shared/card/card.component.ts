import { Component, Input, OnInit } from '@angular/core';
import { Topic } from '../../../entity/Topic';
import { MatDialog } from '@angular/material';
import { OpenCardDialogComponent } from './open-card-dialog/open-card-dialog.component';
import { Subtopic } from '../../../entity/Subtopic';
import { GridService } from '../../../service/grid.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {

  @Input() topic: Topic;

  cardColor: string;

  constructor(private dialog: MatDialog,
              private gridService: GridService) { }

  ngOnInit() {
    if (this.topic.subtopics[0]) {
      this.cardColor = this.topic.subtopics[0].level.color;
    }
  }

  openSubtopic(event: Event, subtopic: Subtopic) {
    console.dir(event.target);
    event.preventDefault();
    this.dialog.open(OpenCardDialogComponent, {
      width: '450px',
      data: subtopic
    });
  }

  doneCheckboxClick(event: MouseEvent, subtopic: any) {
    const target = event.target as HTMLInputElement;
    this.gridService.changeDoneStatus(this.topic, subtopic, target.checked);
  }
}

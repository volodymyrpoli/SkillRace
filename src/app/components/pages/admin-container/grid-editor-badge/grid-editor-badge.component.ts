import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-grid-editor-badge',
  templateUrl: './grid-editor-badge.component.html',
  styleUrls: ['./grid-editor-badge.component.css']
})
export class GridEditorBadgeComponent implements OnInit {

  @Input() badgeData: { color: string, name: string};
  constructor() { }

  ngOnInit() {
  }

}

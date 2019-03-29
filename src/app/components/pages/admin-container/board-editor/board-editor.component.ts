import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EditLevelListModalComponent } from '../edit-level-list-modal/edit-level-list-modal.component';

@Component({
  selector: 'app-board-editor',
  templateUrl: './board-editor.component.html',
  styleUrls: ['./board-editor.component.css']
})
export class BoardEditorComponent implements OnInit {

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  openEditLevel() {
    this.dialog.open(EditLevelListModalComponent, {
      width: '450px'
    });
  }
}

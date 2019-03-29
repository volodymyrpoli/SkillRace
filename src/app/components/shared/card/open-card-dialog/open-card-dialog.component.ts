import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormBuilder } from '@angular/forms';
import { InputData } from '../../../pages/admin-container/edit-base-entity/edit-base-entity.component';
import { Subtopic } from '../../../../entity/Subtopic';

@Component({
  selector: 'app-open-card-dialog',
  templateUrl: './open-card-dialog.component.html',
  styleUrls: ['./open-card-dialog.component.css']
})
export class OpenCardDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<OpenCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Subtopic,
    private formBuilder: FormBuilder) {}

  ngOnInit() {
  }

}

import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { BaseEntity } from '../../../../entity/BaseEntity';
import { interval, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';

export interface InputData {
  baseEntity: BaseEntity;
  callback: (baseEntity: BaseEntity) => void;
}

@Component({
  selector: 'app-edit-base-entity',
  templateUrl: './edit-base-entity.component.html',
  styleUrls: ['./edit-base-entity.component.css']
})
export class EditBaseEntityComponent implements OnInit {

  formGroup: FormGroup;
  changeName$ = new Subject<string>();
  showSavedChangeProcess = false;

  constructor(
    public dialogRef: MatDialogRef<EditBaseEntityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InputData,
    private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      name: ['']
    });
    this.changeName$
      .pipe(
        debounce(() => interval(2000))
      )
      .subscribe(value => {
        this.showSavedChangeProcess = false;
        this.data.callback(new BaseEntity(this.data.baseEntity.id, value));
      });
  }

  changeNameHandler(event: KeyboardEvent) {
    this.showSavedChangeProcess = true;
    this.changeName$.next((event.target as HTMLInputElement).value);
  }
}

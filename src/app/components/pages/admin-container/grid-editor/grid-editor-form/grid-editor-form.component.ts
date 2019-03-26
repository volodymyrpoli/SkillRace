import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Level } from '../../../../../entity/Level';
import { FormBuilder, FormGroup, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-grid-editor-form',
  templateUrl: './grid-editor-form.component.html',
  styleUrls: ['./grid-editor-form.component.css']
})
export class GridEditorFormComponent implements OnInit {

  @Input() withBadge = false;
  @Input() levels: Level[];
  @Output() hideMe = new EventEmitter();

  formGroup: FormGroup;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    if (this.withBadge) {
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required],
        level: ['', Validators.required]
      });
    } else {
      this.formGroup = this.formBuilder.group({
        name: ['', Validators.required]
      });
    }
  }

  hide() {
    this.hideMe.emit();
    console.log('hide');
  }

  submit() {
    if (this.formGroup.valid) {
      console.log(this.formGroup.value);
    }
  }
}

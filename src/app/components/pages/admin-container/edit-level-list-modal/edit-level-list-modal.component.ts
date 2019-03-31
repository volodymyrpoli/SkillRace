import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Level } from '../../../../entity/Level';
import { GridService } from '../../../../service/grid.service';
import { interval, Observable, Subject } from 'rxjs';
import { debounce } from 'rxjs/operators';

@Component({
  selector: 'app-edit-link-list-modal',
  templateUrl: './edit-level-list-modal.component.html',
  styleUrls: ['./edit-level-list-modal.component.css']
})
export class EditLevelListModalComponent implements OnInit {

  formGroup: FormGroup;
  changeColor$ = new Subject<string>();
  editMode = false;
  nowEditLevel: Level;

  private static getRandomColor() {
    const letters = '0123456789abcdef';
    let color = '';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  constructor(
    public dialogRef: MatDialogRef<EditLevelListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Level,
    private formBuilder: FormBuilder,
    private gridService: GridService) {}

  ngOnInit() {
    const randomColor = EditLevelListModalComponent.getRandomColor();
    this.formGroup = this.formBuilder.group({
      title: ['', Validators.required],
      color: [randomColor, Validators.pattern(/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/)],
      colorPicker: ['#' + randomColor]
    });
    this.gridService.loadLevels();
    this.changeColor$
      .pipe(debounce(value => interval(500)))
      .subscribe(value => {
        if (this.formGroup.get('color').valid) {
          this.formGroup.patchValue({ color: value, colorPicker: '#' + value });
        }
      });
  }

  getLevels(): Observable<Level[]> {
    return this.gridService.levels$;
  }

  changeColor(event): void {
    this.changeColor$.next((event.target.value as string).replace(/#/g, ''));
  }

  createLevel(name: string, color: string) {
    this.gridService.createLevel(name, color);
  }

  submit() {
    if (this.formGroup.valid) {
      this.createLevel(this.formGroup.value.title, '#' + this.formGroup.value.color);
    } else {
      alert(this.formGroup.errors);
    }
  }

  editLevel() {
    if (this.formGroup.valid) {
      this.gridService.patchLevel(this.nowEditLevel.id, this.formGroup.value.title, '#' + this.formGroup.value.color);
      this.resetForm();
      this.editMode = false;
      this.nowEditLevel = null;
    }
  }

  startEditLevel(level: Level) {
    this.editMode = true;
    this.nowEditLevel = level;
    this.formGroup.reset({
      title: level.name,
      color: level.color.replace(/#/g, ''),
      colorPicker: level.color
    });
  }

  cancelEditMode() {
    this.editMode = false;
    this.resetForm();
  }

  resetForm() {
    const randomColor = EditLevelListModalComponent.getRandomColor();
    this.formGroup.reset({
      title: '',
      color: randomColor,
      colorPicker: '#' + randomColor
    });
  }
}

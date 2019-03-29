import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatSelectChange } from '@angular/material';
import { Subtopic } from '../../../../entity/Subtopic';
import { FormBuilder, FormGroup } from '@angular/forms';
import { interval, Subject } from 'rxjs';
import { Level } from '../../../../entity/Level';
import { GridService } from '../../../../service/grid.service';
import { debounce } from 'rxjs/operators';
import { Attachment } from '../../../../entity/Attachment';

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  styleUrls: ['./edit-cell.component.css']
})
export class EditCellComponent implements OnInit {

  linkForm: FormGroup;
  subtopicForm: FormGroup;
  private changeSubtopicName$ = new Subject();
  private changeSubtopicLevel$ = new Subject();
  subtopicNameSaving = false;
  subtopicLevelSaving = false;

  constructor(
    public dialogRef: MatDialogRef<EditCellComponent>,
    @Inject(MAT_DIALOG_DATA) public subtopic: Subtopic,
    private formBuilder: FormBuilder,
    private gridService: GridService) {}

  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      link: [''],
      title: ['']
    });

    this.subtopicForm = this.formBuilder.group({
      name: [''],
      level: ['']
    });

    this.changeSubtopicName$
      .pipe(
        debounce(() => interval(1000))
      ).subscribe((event: Event) => {
        this.subtopicNameSaving = false;
        this.gridService.changeSubtopicName(this.subtopic, (event.target as HTMLInputElement).value);
      });

    this.changeSubtopicLevel$
      .pipe(
        debounce(() => interval(1000))
      ).subscribe((event: MatSelectChange) => {
        console.dir(event);
        this.subtopicLevelSaving = false;
        let level = null;
        this.gridService.levels$
          .subscribe(levels => level = levels.find(item => item.id === event.value))
          .unsubscribe();
        this.gridService.changeSubtopicLevel(this.subtopic, level);
    });
  }

  getLevels(): Subject<Level[]> {
    return this.gridService.levels$;
  }

  addLink(): void {

    if (this.linkForm.valid) {
      this.gridService.attachLinkForSubtopic(
        this.subtopic,
        new Attachment(null, this.linkForm.value.title, this.linkForm.value.link)
      );
      this.linkForm.reset();
    }
  }

  changeNameHandler(event: Event) {
    this.subtopicNameSaving = true;
    this.changeSubtopicName$.next(event);
  }

  changeLevelHandler(event: Event) {
    this.subtopicLevelSaving = true;
    this.changeSubtopicLevel$.next(event);
  }
}

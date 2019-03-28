import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Subtopic } from '../../../../entity/Subtopic';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { Level } from '../../../../entity/Level';
import { GridService } from '../../../../service/grid.service';

@Component({
  selector: 'app-edit-cell',
  templateUrl: './edit-cell.component.html',
  styleUrls: ['./edit-cell.component.css']
})
export class EditCellComponent implements OnInit {

  links: {url: string, title: string}[] = [];
  linkForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<EditCellComponent>,
    @Inject(MAT_DIALOG_DATA) public subtopic: Subtopic,
    private formBuilder: FormBuilder,
    private gridService: GridService) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
    this.linkForm = this.formBuilder.group({
      link: [''],
      title: ['']
    });
    this.gridService.load();
  }

  getLevels(): Subject<Level[]> {
    return this.gridService.levels$;
  }

  addLink(): void {
    if (this.linkForm.valid) {
      if (!this.linkForm.value.title) {
        this.links.push({
          url: this.linkForm.value.link,
          title: this.linkForm.value.link
        });
      } else {
        this.links.push({
          url: this.linkForm.value.link,
          title: this.linkForm.value.title
        });
      }
      this.linkForm.reset();
      this.linkForm.markAsPristine();
      this.linkForm.markAsUntouched();
      // this.linkForm.updateValueAndValidity();
    }
  }
}

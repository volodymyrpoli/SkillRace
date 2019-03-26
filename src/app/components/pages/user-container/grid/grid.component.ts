import { Component, OnInit } from '@angular/core';
import { GridRepositoryService } from '../../../../service/grid-repository.service';
import { Observable, Subject } from 'rxjs';
import { Domain } from '../../../../entity/Domain';
import { Level } from '../../../../entity/Level';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  domains$: Subject<Domain[]> = new Subject();
  levels$: Subject<Level[]> = new Subject();

  constructor(private gridRepository: GridRepositoryService) { }

  ngOnInit(): void {
    this.gridRepository.getDomains().subscribe(
      domains => this.domains$.next(domains)
    );
    this.gridRepository.getLevels().subscribe(
      levels => this.levels$.next(levels)
    );
  }
}

import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Domain } from '../../../../entity/Domain';
import { Level } from '../../../../entity/Level';
import { GridService } from '../../../../service/grid.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  constructor(private gridService: GridService) { }

  ngOnInit(): void {
    this.gridService.load();
  }

  getDomains(): Subject<Domain[]> {
    return this.gridService.domains$;
  }

  getLevels(): Subject<Level[]> {
    return this.gridService.levels$;
  }
}

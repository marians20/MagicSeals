import { Component, OnInit } from '@angular/core';
import { Seal } from '../models/seal.model';
import { SealsService } from '../services/seals.service';

@Component({
  selector: 'app-seals',
  templateUrl: './seals.component.html',
  styleUrls: ['./seals.component.scss']
})
export class SealsComponent implements OnInit {
  statement: string = ''
  seal: Seal = {}
  constructor(private readonly sealsService: SealsService) { }

  ngOnInit(): void {
  }

  onModelChangeHandler(event: any) {
    this.seal = this.sealsService.getSeal(event);
  }

}

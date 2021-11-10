import { Component, Input, OnInit } from '@angular/core';
import { Seal } from '../../../models/seal.model';

@Component({
  selector: 'app-seal',
  templateUrl: './seal.component.html',
  styleUrls: ['./seal.component.scss']
})
export class SealComponent implements OnInit {
  @Input() seal: Seal | undefined;
  constructor() { }

  ngOnInit(): void {
  }

}

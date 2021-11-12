import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Seal } from '../../../models/seal.model';
import { GraphicalSealComponent } from '../../graphical-seal/graphical-seal.component';

@Component({
  selector: 'app-seal',
  templateUrl: './seal.component.html',
  styleUrls: ['./seal.component.scss']
})
export class SealComponent implements OnInit {
  @Input() seal!: Seal;
  @ViewChild('graphicSigil') graphicSigil!: GraphicalSealComponent;
  constructor() { }

  ngOnInit(): void {
  }
}

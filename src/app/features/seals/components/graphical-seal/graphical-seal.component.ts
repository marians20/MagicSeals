import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Size2D } from './models/size-2d.valueobject';

@Component({
  selector: 'app-graphical-seal',
  templateUrl: './graphical-seal.component.html',
  styleUrls: ['./graphical-seal.component.scss']
})
export class GraphicalSealComponent implements OnInit, AfterContentInit {
  @Input() literalSeal: string | undefined;
  @Input() backgroundColor = '#FAFAFA';
  @Input() foreColor = '#00FF00';
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private ctx: CanvasRenderingContext2D | undefined | null;
  private canvasSize: Size2D = new Size2D();
  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }


  ngAfterContentInit(): void {
    if(!this.ctx) {
      console.log('Unable to create context.');
      return;
    }
    this.canvasSize = new Size2D(this.canvas.nativeElement.height, this.canvas.nativeElement.width);

    this.drawBackground();
    this.drawBorder();
  }

  private drawBackground(): void {
    this.ctx!.fillStyle = this.backgroundColor;
    this.ctx!.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  }

  private drawBorder(): void {
    this.ctx!.strokeStyle = this.foreColor;
    this.ctx!.rect(0, 0, this.canvasSize.width, this.canvasSize.height);
  }

}

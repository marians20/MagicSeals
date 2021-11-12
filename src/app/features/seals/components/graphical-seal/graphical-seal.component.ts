import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Size2D, Point } from './models';

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
    this.drawSealCircle();
    this.drawSeal([
      {
        x: 10, y: 25
      },
      {
        x: 100, y: 250
      },
      {
        x: 200, y: 30
      },
      {
        x: 50, y: 100
      },
    ])
  }

  private drawBackground(): void {
    this.ctx!.fillStyle = this.backgroundColor;
    this.ctx!.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height);
  }

  private drawBorder(): void {
    this.initStroke(this.foreColor, 2)
    this.ctx!.rect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.ctx!.stroke();
  }

  private drawSealCircle(): void {
    const padding = 4;
    const radius = Math.min(this.canvasSize.width, this.canvasSize.height) / 2 - padding;
    this.drawCircle({x: this.canvasSize.width / 2, y: this.canvasSize.height / 2}, radius)
  }

  private drawSeal(points: Point[]) {
    this.drawCircle(points[0], 4);
    this.initStroke(this.foreColor, 2);
    this.ctx!.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
      this.ctx!.lineTo(points[i].x, points[i].y);
    }
    this.ctx!.stroke();
  }

  private initStroke(strokeStyle: string | CanvasGradient | CanvasPattern, lineWidth: number): void {
    this.ctx!.beginPath();
    this.ctx!.strokeStyle = strokeStyle;
    this.ctx!.lineWidth = lineWidth;
  }

  private drawCircle(center: Point, radius: number): void {
    this.initStroke(this.foreColor, 2)
    this.ctx!.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.ctx!.stroke();
  }

}

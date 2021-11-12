import { AfterContentInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';

import { Size2D, Point } from './models';
import { Segment } from './models/segment';

@Component({
  selector: 'app-graphical-seal',
  templateUrl: './graphical-seal.component.html',
  styleUrls: ['./graphical-seal.component.scss']
})
export class GraphicalSealComponent implements OnInit, AfterContentInit {
  @Input() literalSeal: string | undefined;
  @Input() backgroundColor = '#FAFAFA';
  @Input() foreColor = '#00FF00';
  @Input() lineWidth: number = 1;
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
    this.initStroke(this.foreColor, this.lineWidth)
    this.ctx!.rect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.ctx!.stroke();
  }

  private drawSealCircle(): void {
    const padding = 4;
    const radius = Math.min(this.canvasSize.width, this.canvasSize.height) / 2 - padding;
    this.drawCircle({x: this.canvasSize.width / 2, y: this.canvasSize.height / 2}, radius)
  }

  private drawSeal(points: Point[]) {
    if(points.length === 0) {
      return;
    }
    const startSealCircleRadius = Math.min(this.canvasSize.height, this.canvasSize.width) / 50;
    this.drawCircle(points[0], startSealCircleRadius);

    if(points.length < 2) {
      return;
    }

    this.drawSealSegments(points, startSealCircleRadius);

    this.drawSegment(this.getSealTerminator(new Segment(points.slice(-2)[0], points.slice(-1)[0]), startSealCircleRadius));
  }

  private drawSealSegments(points: Point[], startSealCircleRadius: number) {
    const firstPoint = this.trimLineToCircle(points[0], points[1], startSealCircleRadius);
    this.initStroke(this.foreColor, this.lineWidth);
    this.ctx!.moveTo(firstPoint.x, firstPoint.y);
    for(let i = 1; i < points.length; i++) {
      this.ctx!.lineTo(points[i].x, points[i].y);
    }
    this.ctx!.stroke();
  }

  private drawCircle(center: Point, radius: number): void {
    this.initStroke(this.foreColor, this.lineWidth);
    this.ctx!.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this.ctx!.stroke();
  }

  private drawSegment(segment: Segment) {
    this.drawLine(segment.p1, segment.p2);
  }

  private drawLine(p1: Point, p2: Point) {
    this.initStroke(this.foreColor, this.lineWidth);
    this.ctx!.moveTo(p1.x, p1.y);
    this.ctx!.lineTo(p2.x, p2.y);
    this.ctx!.stroke();
  }

  private initStroke(strokeStyle: string | CanvasGradient | CanvasPattern, lineWidth: number): void {
    this.ctx!.beginPath();
    this.ctx!.strokeStyle = strokeStyle;
    this.ctx!.lineWidth = lineWidth;
  }

  private trimLineToCircle(p1: Point, p2: Point, radius: number): Point {
    const alpha = Math.atan((p2.y - p1.y) / (p2.x - p1.x));
    return {
      x: p1.x + radius * Math.cos(alpha),
      y: p1.y + radius * Math.sin(alpha)
    };
  }

  private getSealTerminator(lastSegment: Segment, radius: number): Segment {
    const alpha = lastSegment.alpha + Math.PI / 2;
    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);
    return new Segment(
      {
        x: lastSegment.p2.x - radius * cosAlpha,
        y: lastSegment.p2.y - radius * sinAlpha
      },      {
        x: lastSegment.p2.x + radius * cosAlpha,
        y: lastSegment.p2.y + radius * sinAlpha
      },
    )
  }
}

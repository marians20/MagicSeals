import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Size2D, Point } from '../../models';
import { Segment } from '../../models/segment';
import { CharactersMapService } from '../../services/characters-map.service';
import { GraphicalSealService } from '../../services/graphical-seal.service';

@Component({
  selector: 'app-graphical-seal',
  templateUrl: './graphical-seal.component.html',
  styleUrls: ['./graphical-seal.component.scss']
})
export class GraphicalSealComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() backgroundColor = '#FFFFFF';
  @Input() foreColor = '#FFFF00';
  @Input() lineWidth: number = 2;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private readonly _subscription: Subscription = new Subscription();
  private ctx: CanvasRenderingContext2D | undefined | null;
  private canvasSize: Size2D = new Size2D();
  private sealRadius!: number;
  private padding: number = 4;
  constructor(
    private readonly mapService: CharactersMapService,
    private readonly graphicalSealService: GraphicalSealService) {
      this._subscription.add(this.graphicalSealService.onDrawSigilRequest.subscribe(literalSigil => {
        this.drawSigil(literalSigil);
      }));

      this._subscription.add(this.graphicalSealService.onGetImageRequest.subscribe(() => {
        this.graphicalSealService.image = this.getJpeg();
      }));      
     }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    if(!this.ctx) {
      console.log('Unable to create context.');
      return;
    }
    this.canvasSize = new Size2D(this.canvas.nativeElement.height, this.canvas.nativeElement.width);
    this.sealRadius = Math.min(this.canvasSize.width, this.canvasSize.height) / 2 - this.padding;

    this.drawSigil('');
  }

  public drawSigil(literalSigil: string) {
    this.ctx!.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height);
    this.drawBackground();
    //this.drawBorder();
    this.drawSealCircle();

    const points = this.mapService.getPoints(literalSigil, this.sealRadius)
    .map(p => p.translate(this.sealRadius, this.sealRadius));
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

  public getBitmap() {
    return this.ctx!
    .getImageData(0, 0, this.canvasSize.height, this.canvasSize.width).data;
    this.canvas.nativeElement.toDataURL("image/jpeg", 1.0).replace("data:image/jpeg;base64,","");
  }

  public getJpeg() {
    return this.canvas.nativeElement
      .toDataURL("image/jpeg", 1.0);
      //.replace("data:image/jpeg;base64,","");
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
    this.drawCircle(new Point(this.canvasSize.width / 2, this.canvasSize.height / 2), this.sealRadius)
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
    let adjustment = p2.x < p1.x ? Math.PI : 0;
    const x = p1.x + radius * Math.cos(alpha + adjustment);
    const y = p1.y + radius * Math.sin(alpha + adjustment);
    return new Point(x, y);
  }

  private getSealTerminator(lastSegment: Segment, radius: number): Segment {
    const alpha = lastSegment.alpha - Math.PI / 2;
    const cosAlpha = Math.cos(alpha);
    const sinAlpha = Math.sin(alpha);
    return new Segment(
      new Point(lastSegment.p2.x - radius * cosAlpha, lastSegment.p2.y - radius * sinAlpha),
      new Point(lastSegment.p2.x + radius * cosAlpha, lastSegment.p2.y + radius * sinAlpha)
    )
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Point, Segment } from '../models';
import { CharactersMapService } from './characters-map.service';
import { DrawService, StrokeStyle } from './draw.service';

@Injectable({
  providedIn: 'root'
})
export class GraphicalSealService {
  backgroundColor!: StrokeStyle;
  foreColor!: StrokeStyle;
  lineWidth!: number;
  shouldDrawMap!: boolean;

  private sigilRadius!: number;
  private padding: number = 4;
  private _image: string = '';

  onDrawSigilRequest: Subject<string> = new Subject();
  onGetImageRequest: Subject<void> = new Subject();
  onImageGot: Subject<string> = new Subject();
  
  constructor(
    private readonly mapService: CharactersMapService,
    private readonly draw: DrawService
  ) { }

  set image(value: string) {
    this._image = value;
    this.onImageGot.next(this._image);
  }

  get image(): string {
    return this._image;
  }

  set ctx(value: CanvasRenderingContext2D) {
    this.draw.ctx = value;
    this.sigilRadius = Math.min(this.draw.canvasSize.width, this.draw.canvasSize.height) / 2 - this.padding;
  }

  get ctx(): CanvasRenderingContext2D {
    return this.draw.ctx;
  }

  requestDrawSigil(literalSigil: string): void {
    this.onDrawSigilRequest.next(literalSigil);
  }

  drawSigil(literalSigil: string) {
    this.drawScene();
    const points = this.mapService.getPoints(literalSigil, this.sigilRadius);
    if(points.length === 0) {
      return;
    }
    const startSealCircleRadius = Math.min(this.draw.canvasSize.height, this.draw.canvasSize.width) / 50;
    this.draw.drawCircle(points[0], startSealCircleRadius, this.foreColor, this.lineWidth);

    if(points.length < 2) {
      return;
    }

    this.draw.drawPLine([this.trimLineToCircle(points[0], points[1], startSealCircleRadius), ...points.slice(1)], this.foreColor, this.lineWidth);
    this.draw.drawSegment(this.getSealTerminator(new Segment(points.slice(-2)[0], points.slice(-1)[0]), startSealCircleRadius), this.foreColor, this.lineWidth);
  }

  getImage() {
    this.onGetImageRequest.next();
  }


  getJpeg() {
    return this.draw.getJpeg();
  }

  private drawMap() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const charHeight = this.draw.ctx.measureText('M').width;
    const charWidth = this.draw.ctx.measureText('M').width;
    const points = this.mapService.getPoints(chars, this.sigilRadius)
      .map(p => p.translate(- charWidth / 2, charHeight / 2));

    this.draw.initStroke(this.foreColor, this.lineWidth);
    this.draw.ctx.fillStyle = this.foreColor;

    [...chars].forEach((char, index) => {
      this.draw.fillText(char, points[index]);
    })
  }

  private drawScene() {
    this.draw.clearRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height));
    this.draw.fillRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height), this.backgroundColor);
    this.draw.drawCircle(new Point(this.draw.canvasSize.width / 2, this.draw.canvasSize.height / 2), this.sigilRadius, this.foreColor, this.lineWidth);
    if(this.shouldDrawMap) {
      this.drawMap();
    }
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

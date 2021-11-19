import { Injectable } from '@angular/core';
import { Point, Segment, Size2D } from '../models';
import { StrokeStyle } from '../models/seal.options';

@Injectable({
  providedIn: 'root'
})
export class DrawService {
  private _ctx!: CanvasRenderingContext2D;
  private _canvasSize!: Size2D;

  constructor() { }
  get ctx(): CanvasRenderingContext2D {
    return this._ctx;
  }

  set ctx(value: CanvasRenderingContext2D) {
    this._ctx = value;
    this._canvasSize = new Size2D(this._ctx.canvas.height, this._ctx.canvas.width);
  }

  get canvasSize(): Size2D {
    return this._canvasSize;
  }

  drawRectangle(p1: Point, p2: Point, strokeStyle: StrokeStyle, lineWidth: number): void {
    this.initStroke(strokeStyle, lineWidth)
    this._ctx.rect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
    this._ctx.stroke();
  }

  fillRectangle(p1: Point, p2: Point, fillStyle: StrokeStyle): void {
    this._ctx.fillStyle = fillStyle;
    this._ctx.fillRect(p1.x, p1.y, p2.x-p1.x, p2.y - p1.y);
  }

  clearRectangle(p1: Point, p2: Point) {
    this._ctx.clearRect(p1.x, p1.y, p2.x - p1.x, p2.y - p1.y);
  }

  drawCircle(center: Point, radius: number, strokeStyle: StrokeStyle, lineWidth: number): void {
    this.initStroke(strokeStyle, lineWidth);
    this._ctx.arc(center.x, center.y, radius, 0, Math.PI * 2);
    this._ctx.stroke();
  }

  drawSegment(segment: Segment, strokeStyle: StrokeStyle, lineWidth: number) {
    this.drawLine(segment.p1, segment.p2, strokeStyle, lineWidth);
  }

  drawLine(p1: Point, p2: Point, strokeStyle: StrokeStyle, lineWidth: number) {
    this.initStroke(strokeStyle, lineWidth);
    this._ctx.moveTo(p1.x, p1.y);
    this._ctx.lineTo(p2.x, p2.y);
    this._ctx.stroke();
  }

  drawPLine(points: Point[], strokeStyle: StrokeStyle, lineWidth: number) {
    this.initStroke(strokeStyle, lineWidth);
    this._ctx.moveTo(points[0].x, points[0].y);
    for(let i = 1; i < points.length; i++) {
      this._ctx!.lineTo(points[i].x, points[i].y);
    }

    this._ctx.stroke();
  }

  fillText(text: string, point: Point) {
    this._ctx.fillText(text, point.x, point.y);
  }

  initStroke(strokeStyle: StrokeStyle, lineWidth: number): void {
    this._ctx.lineCap = 'round';
    this._ctx.beginPath();
    this._ctx.strokeStyle = strokeStyle;
    this._ctx.lineWidth = lineWidth;
  }

  stroke() {
    this._ctx.stroke();
  }


  getBitmap() {
    return this._ctx
    .getImageData(0, 0, this.canvasSize.height, this.canvasSize.width).data;
  }

  getJpeg() {
    return this._ctx.canvas.toDataURL("image/jpeg", 1.0);
  }
}

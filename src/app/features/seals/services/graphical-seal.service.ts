import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Point, Segment } from '../models';
import { SealOptions } from '../models/seal.options';
import { CharactersMapService } from './characters-map.service';
import { DrawService } from './draw.service';
import { PositionedText } from '../models/positioned-text.model';

@Injectable({
  providedIn: 'root'
})
export class GraphicalSigilService {
  options!: SealOptions;

  private _sigilRadius!: number;
  private lineWidth!: number;
  private _padding!: number;
  private _canvas!: HTMLCanvasElement;
  private _literalSigil!: string;

  constructor(
    private readonly mapService: CharactersMapService,
    private readonly draw: DrawService
  ) { }

  set canvas(value: HTMLCanvasElement) {
    if(!value) {
      return;
    }

    this._canvas = value;
    this.ctx = (this._canvas).getContext('2d')!;
  }

  get ctx(): CanvasRenderingContext2D {
    return this.draw.ctx;
  }

  private set ctx(value: CanvasRenderingContext2D) {
    this.draw.ctx = value;
    const size = Math.min(this.draw.canvasSize.width, this.draw.canvasSize.height)
    this._padding = size / 50;
    this._sigilRadius = size / 2 - this._padding;
    this.lineWidth = Math.ceil(size / 80);
  }

  drawSigil(literalSigil: string) {
    this._literalSigil = literalSigil;
    this.drawScene();
    const points = this.mapService.getPoints(literalSigil, this._sigilRadius);
    if(points.length === 0) {
      return;
    }
    const startSealCircleRadius = Math.ceil(Math.min(this.draw.canvasSize.height, this.draw.canvasSize.width) / 50);
    this.draw.drawCircle(points[0], startSealCircleRadius, this.options.sigilColor, this.lineWidth);

    if(points.length < 2) {
      return;
    }

    this.draw.drawPLine([this.trimLineToCircle(points[0], points[1], startSealCircleRadius), ...points.slice(1)], this.options.sigilColor, this.lineWidth);
    this.draw.drawSegment(this.getSealTerminator(new Segment(points.slice(-2)[0], points.slice(-1)[0]), startSealCircleRadius), this.options.sigilColor, this.lineWidth);
  }

  getJpeg() {
    const originalCanvas = this._canvas;
    const virtualCanvas: HTMLCanvasElement = document.createElement('canvas');
    virtualCanvas.width = 2000;
    virtualCanvas.height = 2000;
    this.canvas = virtualCanvas;
    this.drawSigil(this._literalSigil)
    const result = this.draw.getJpeg();
    this.canvas = originalCanvas;
    this.drawSigil(this._literalSigil);
    return result;
  }

  private drawScene() {
    this.draw.clearRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height));
    this.draw.fillRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height), this.options.backgroundColor);
    this.draw.drawCircle(new Point(this.draw.canvasSize.width / 2, this.draw.canvasSize.height / 2), this._sigilRadius, this.options.circleColor, this.lineWidth);
    if(this.options.shouldDrawMap) {
      this.drawMap();
    }
  }

  private drawMap() {
    const chars = this.mapService.getAllCharacters();
    const fontSize = `${this.lineWidth * 4}px`;
    this.ctx.font = `${fontSize} ${this.ctx.font.split(' ')[1]}`;
    const charHeight = this.draw.ctx.measureText('M').width;
    const charWidth = this.draw.ctx.measureText('M').width;

    const positionedTexts = this.mapService.getPoints(chars, this._sigilRadius)
      .map(p => p.translate(- charWidth / 2, charHeight / 2))
      .map((point, index) => {
        return {position: point, text: chars[index]} as PositionedText;
      });

      this.draw.fillTexts(positionedTexts, this.options.mapColor, this.lineWidth);
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

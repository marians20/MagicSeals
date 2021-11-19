import { Injectable } from '@angular/core';

import { Point, Segment } from '../models';
import { SealOptions } from '../models/seal.options';
import { CharactersMapService } from './characters-map.service';
import { DrawService } from './draw.service';
import { PositionedText } from '../models/positioned-text.model';
import { PolarPoint } from '../models/polar-point';

@Injectable({
  providedIn: 'root'
})
export class GraphicalSigilService {
  options!: SealOptions;

  private _sigilRadius!: number;
  private _lineWidth!: number;
  private _padding!: number;
  private _canvas!: HTMLCanvasElement;
  private _literalSigil!: string;

  constructor(
    private readonly mapService: CharactersMapService,
    private readonly draw: DrawService
  ) { }

  get canRun(): boolean {
    return this.ctx !== undefined;
  }

  set canvas(value: HTMLCanvasElement) {
    if(!value) {
      return;
    }

    this._canvas = value;
    this.ctx = (this._canvas).getContext('2d')!;
    this.ctx.imageSmoothingEnabled = true;
  }

  private get ctx(): CanvasRenderingContext2D {
    return this.draw.ctx;
  }

  private set ctx(value: CanvasRenderingContext2D) {
    if(!value)
    {
      return;
    }

    this.draw.ctx = value;
    const size = Math.min(this.draw.canvasSize.width, this.draw.canvasSize.height)
    this._padding = size / 50;
    this._sigilRadius = size / 2 - this._padding;
    this._lineWidth = Math.ceil(size / 80);
  }

  private get charWidth(): number {
    return this.draw.ctx.measureText('M').width;
  }

  private get charHeight(): number {
    return this.draw.ctx.measureText('M').width;
  }

  drawSigil(literalSigil: string) {
    if(!this.canRun) {
      return;
    }

    this._literalSigil = literalSigil;
    this.drawScene();
    const points = this.mapService.getPoints(literalSigil, this._sigilRadius);
    if(points.length === 0) {
      return;
    }
    const startSealCircleRadius = Math.ceil(Math.min(this.draw.canvasSize.height, this.draw.canvasSize.width) / 50);
    this.draw.drawCircle(points[0], startSealCircleRadius, this.options.sigilColor, this._lineWidth);

    if(points.length < 2) {
      return;
    }

    this.draw.drawPLine([this.trimLineToCircle(points[0], points[1], startSealCircleRadius), ...points.slice(1)], this.options.sigilColor, this._lineWidth);
    this.draw.drawSegment(this.getSealTerminator(new Segment(points.slice(-2)[0], points.slice(-1)[0]), startSealCircleRadius), this.options.sigilColor, this._lineWidth);
  }

  getJpeg() {
    const originalCanvas = this._canvas;
    const originalShouldDrawMap = this.options.shouldDrawMap;
    const virtualCanvas: HTMLCanvasElement = document.createElement('canvas');
    virtualCanvas.width = 2000;
    virtualCanvas.height = 2000;
    this.canvas = virtualCanvas;
    this.options.shouldDrawMap = false;
    this.drawSigil(this._literalSigil)
    const result = this.draw.getJpeg();
    this.canvas = originalCanvas;
    this.options.shouldDrawMap = originalShouldDrawMap;
    this.drawSigil(this._literalSigil);
    return result;
  }

  private drawScene() {
    this.draw.clearRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height));
    this.draw.fillRectangle(new Point(0, 0), new Point(this.draw.canvasSize.width, this.draw.canvasSize.height), this.options.backgroundColor);
    this.draw.drawCircle(new Point(this.draw.canvasSize.width / 2, this.draw.canvasSize.height / 2), this._sigilRadius, this.options.circleColor, this._lineWidth);
    if(this.options.shouldDrawMap) {
      this.drawMap();
    }
  }

  private drawMap() {
    this.drawMapCircles();

    this.draw.drawLine(
      new Point(this.draw.canvasSize.width / 2, this.draw.canvasSize.height / 2),
      new PolarPoint(0, this._sigilRadius).toCartezian().translate(0, this._padding),
      this.options.mapColor,
      Math.ceil(this._lineWidth / 2));

    const chars = this.mapService.getAllCharacters();
    const fontSize = `${this._lineWidth * 4}px`;
    this.ctx.font = `${fontSize} ${this.ctx.font.split(' ')[1]}`;
    const halfCharSize = this.charWidth / 2;
    const positionedTexts = this.mapService.getPoints(chars, this._sigilRadius)
      .map(p => p.translate(0, halfCharSize))
      .map((point, index) => {
        return {position: point, text: chars[index]} as PositionedText;
      });

      this.draw.fillTexts(positionedTexts, this.options.mapColor, this._lineWidth);
  }

  private drawMapCircles() {
    const center: Point = new Point(this.draw.canvasSize.width / 2, this.draw.canvasSize.height / 2);
    this.mapService.getCirclesRadiuses(this._sigilRadius).forEach(p => {
      this.draw.drawCircle(center, p, this.options.mapColor, Math.ceil(this._lineWidth / 2));
    });
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

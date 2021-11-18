import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { Point } from '../../models';
import { Segment } from '../../models/segment';
import { CharactersMapService } from '../../services/characters-map.service';
import { DrawService } from '../../services/draw.service';
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
  @Input() shouldDrawMap: boolean = false;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private readonly _subscription: Subscription = new Subscription();
  private sigilRadius!: number;
  private padding: number = 4;
  constructor(
    private readonly mapService: CharactersMapService,
    private readonly graphicalSigilService: GraphicalSealService,
    private readonly draw: DrawService) {
      this._subscription.add(this.graphicalSigilService.onDrawSigilRequest.subscribe(literalSigil => {
        this.drawSigil(literalSigil);
      }));

      this._subscription.add(this.graphicalSigilService.onGetImageRequest.subscribe(() => {
        this.graphicalSigilService.image = this.getJpeg();
      }));
     }

  ngOnInit(): void {
    this.draw.ctx = this.canvas.nativeElement.getContext('2d')!;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    if(!this.draw.ctx) {
      console.log('Unable to create context.');
      return;
    }
    this.draw.ctx.imageSmoothingEnabled = true;
    this.sigilRadius = Math.min(this.draw.canvasSize.width, this.draw.canvasSize.height) / 2 - this.padding;

    this.drawSigil('');
  }

  public drawSigil(literalSigil: string) {
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

  public drawMap() {
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

  public getJpeg() {
    return this.draw.getJpeg();
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

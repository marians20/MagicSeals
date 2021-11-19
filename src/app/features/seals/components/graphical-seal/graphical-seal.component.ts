import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { StrokeStyle } from '../../services/draw.service';
import { GraphicalSealService } from '../../services/graphical-seal.service';

@Component({
  selector: 'app-graphical-seal',
  templateUrl: './graphical-seal.component.html',
  styleUrls: ['./graphical-seal.component.scss']
})
export class GraphicalSealComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() backgroundColor!: StrokeStyle;
  @Input() foreColor!: StrokeStyle;
  @Input() lineWidth!: number;
  @Input() shouldDrawMap!: boolean;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private readonly _subscription: Subscription = new Subscription();
  constructor(
    private readonly graphicalSigilService: GraphicalSealService
  ) {
      this._subscription.add(this.graphicalSigilService.onDrawSigilRequest.subscribe(literalSigil => {
        this.graphicalSigilService.drawSigil(literalSigil);
      }));

      this._subscription.add(this.graphicalSigilService.onGetImageRequest.subscribe(() => {
        this.graphicalSigilService.image = this.graphicalSigilService.getJpeg();
      }));
     }

  ngOnInit(): void {
    this.graphicalSigilService.ctx = this.canvas.nativeElement.getContext('2d')!;
    this.graphicalSigilService.backgroundColor = this.backgroundColor;
    this.graphicalSigilService.foreColor = this.foreColor;
    this.graphicalSigilService.lineWidth = this.lineWidth;
    this.graphicalSigilService.shouldDrawMap = this.shouldDrawMap;
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  ngAfterContentInit(): void {
    if(!this.graphicalSigilService.ctx) {
      console.log('Unable to create context.');
      return;
    }
    this.graphicalSigilService.ctx.imageSmoothingEnabled = true;
    this.graphicalSigilService.drawSigil('');
  }
}

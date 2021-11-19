import { AfterContentInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { GraphicalSigilService } from '../../services/graphical-seal.service';
import { SealOptions } from '../../models/seal.options';

@Component({
  selector: 'app-graphical-seal',
  templateUrl: './graphical-seal.component.html',
  styleUrls: ['./graphical-seal.component.scss']
})
export class GraphicalSealComponent implements OnInit, AfterContentInit, OnDestroy {
  @Input() options!: SealOptions;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;

  private readonly _subscription: Subscription = new Subscription();
  constructor(
    private readonly graphicalSigilService: GraphicalSigilService
  ) {
      this._subscription.add(this.graphicalSigilService.onDrawSigilRequest.subscribe(literalSigil => {
        this.graphicalSigilService.drawSigil(literalSigil);
      }));

      this._subscription.add(this.graphicalSigilService.onGetImageRequest.subscribe(() => {
        this.graphicalSigilService.image = this.graphicalSigilService.getJpeg();
      }));
     }

  ngOnInit(): void {
    this.graphicalSigilService.canvas = this.canvas.nativeElement;
    this.graphicalSigilService.options = this.options;
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

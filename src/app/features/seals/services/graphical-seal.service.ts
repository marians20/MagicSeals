import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicalSealService {
  public onDrawSigilRequest: Subject<string> = new Subject();

  constructor() { }

  drawSigil(literalSigil: string): void {
    this.onDrawSigilRequest.next(literalSigil);
  }
}

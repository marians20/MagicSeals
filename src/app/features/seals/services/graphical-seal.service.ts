import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphicalSealService {
  onDrawSigilRequest: Subject<string> = new Subject();
  onGetImageRequest: Subject<void> = new Subject();
  onImageGot: Subject<string> = new Subject();
  private _image:string = '';
  
  constructor() { }

  set image(value: string) {
    this._image = value;
    this.onImageGot.next(this._image);
  }

  get image(): string {
    return this._image;
  }

  drawSigil(literalSigil: string): void {
    this.onDrawSigilRequest.next(literalSigil);
  }

  getImage() {
    this.onGetImageRequest.next();
  }
}

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private _visible = false;
  onToggle = new Subject<boolean>();
  constructor() { }

  get visible(): boolean {
    return this._visible;
  }

  private set visible(value: boolean) {
    if(value === this._visible) {
      return;
    }

    this._visible = value;
    this.onToggle.next(this._visible);
  }

  toggle(): void {
    this.visible = !this.visible;
  }
}

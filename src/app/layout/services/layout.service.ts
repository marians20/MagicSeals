import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private _sidebarOpened: boolean;
  private _darkMode: boolean;

  onSidebarToggle = new Subject<boolean>();
  onDarkModeToggle = new Subject<boolean>();

  constructor() {
    this._sidebarOpened = localStorage.getItem('sidebarOpened') === 'true';
    this._darkMode = localStorage.getItem('darkMode') === 'true';
    console.log(this._sidebarOpened);
    console.log(this._darkMode);
  }

  get sidebarOpened(): boolean {
    return this._sidebarOpened;
  }

  private set sidebarOpened(value: boolean) {
    if(value === this._sidebarOpened) {
      return;
    }

    this._sidebarOpened = value;
    localStorage.setItem('sidebarOpened', this._sidebarOpened.toString());
    this.onSidebarToggle.next(this._sidebarOpened);
  }

  get darkModeEnabled(): boolean {
    return this._darkMode;
  }

  public set darkModeEnabled(value: boolean) {
    if(value === this._darkMode) {
      return;
    }

    this._darkMode = value;
    localStorage.setItem('darkMode', this._darkMode.toString());
    this.onDarkModeToggle.next(this._darkMode);
  }

  sidebarToggle(): void {
    this.sidebarOpened = !this.sidebarOpened;
  }
}

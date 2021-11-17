import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateTimeService {
  private readonly longDateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    day:'numeric',
    month: 'long',
    year:'2-digit',
    weekday:'long'
  };
  constructor() { }

  get formattedNow() {
    return new Intl.DateTimeFormat(
      navigator.language,
      this.longDateTimeFormatOptions as any)
      .format(new Date());
  }
}

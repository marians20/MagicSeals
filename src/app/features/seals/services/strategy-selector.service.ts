import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { SealStrategy } from '../models/seal-strategy.enum';
import { AuthService } from '../../../shared/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StrategySelectorService {
  private _strategy: SealStrategy;
  onStrategyChange = new Subject<SealStrategy>();
  constructor(private readonly auth: AuthService) {
    this._strategy = Number(localStorage.getItem('sealStrstegy')) ?? SealStrategy.RemovePairs;
  }

  get strategy():SealStrategy {
    return this._strategy;
  }

  set strategy(value: SealStrategy) {
    if(this._strategy === value) {
      return;
    }

    if(!this.auth.isAuthenticated) {
      return;
    }

    this._strategy = value;
    localStorage.setItem('sealStrstegy', this._strategy.toString())
    this.onStrategyChange.next(this._strategy);
  }
}

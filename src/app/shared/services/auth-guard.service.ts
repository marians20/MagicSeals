import { Injectable, OnDestroy } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate, OnDestroy {
  private readonly _subscription: Subscription = new Subscription();
  private url: string | undefined = undefined;

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router,

  ) {
    this._subscription.add(
      this.auth.onLoggedIn.subscribe((loggedIn) => {
        if(loggedIn) {
          this.url && this.router.navigate([this.url]);
        }
      })
    );
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
      this.url = state.url;
    if (!this.auth.isAuthenticated) {
      this.auth.login();
      return false;
    }

    return true;
  }
}

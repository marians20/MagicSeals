import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

import { auth, login } from '../../../config/firebase-config';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
    //private readonly auth: AuthService,
    private readonly router: Router) { }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot)
    : Promise<boolean | UrlTree> {
    if (!auth.currentUser) {
      await login();
      return false;
    }

    return true;
  }
}

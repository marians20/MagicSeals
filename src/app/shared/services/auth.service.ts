import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  onLoggedIn: Subject<User> = new Subject();
  onLoggedOut: Subject<void> = new Subject();
  constructor(
    public readonly jwtHelper: JwtHelperService,
    public readonly router: Router) {}

  get isAuthenticated(): boolean {
    if(this.jwtHelper.isTokenExpired()) {
      this.logout();
      return false;
    }

    return true;
  }

  get user(): User | undefined {
    const stringUser = localStorage.getItem('user_details');
    if(!stringUser) {
      return undefined;
    }

    return JSON.parse(stringUser);
  }

  login(user: User) {
    localStorage.setItem('access_token', user.idToken);
    localStorage.setItem('user_details', JSON.stringify(user));
    this.onLoggedIn.next(user);
  }

  logout() {
    console.log('Logout');
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_details');
    this.onLoggedOut.next();
  }

  private setToken(token: string) {
    localStorage.setItem('access_token', token);
  }
}

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { User } from 'firebase/auth';
import { Subject } from 'rxjs';
import { firebaseAuth } from 'src/config/firebase-config';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  onLoggedIn: Subject<User> = new Subject();
  onLoggedOut: Subject<void> = new Subject();
  provider = new GoogleAuthProvider();
  private _user: User | undefined = undefined;
  constructor(
    public readonly jwtHelper: JwtHelperService,
    public readonly router: Router
  ) {
    this.provider.setCustomParameters({ prompt: 'select_account' });
    onAuthStateChanged(firebaseAuth, (user) => {
      this._user = user || undefined;
      if (user) {
        this.onLoggedIn.next(user);
      } else {
        this.onLoggedOut.next();
      }
    });
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }

  get user() {
    return this._user;
  }

  async login() {
    try {
      await signInWithPopup(firebaseAuth, this.provider);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async logout() {
    await signOut(firebaseAuth);
  }
}

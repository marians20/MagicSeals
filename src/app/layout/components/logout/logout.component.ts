import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'firebase/auth';
import { Subscription } from 'rxjs';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss'],
})
export class LogoutComponent implements OnInit, OnDestroy {
  private readonly _subscriptions: Subscription = new Subscription();
  isAuthenticated: boolean;
  user: User | undefined;
  constructor(private readonly auth: AuthService) {
    this.isAuthenticated = auth.isAuthenticated;
    this.user = this.auth.user;

    this._subscriptions.add(
      auth.onLoggedIn.subscribe((user) => {
        this.isAuthenticated = true;
        this.user = user;
      })
    );

    this._subscriptions.add(
      auth.onLoggedOut.subscribe(() => {
        this.isAuthenticated = false;
        this.user = undefined;
      })
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this._subscriptions.unsubscribe();
  }

  async login(): Promise<void> {
    await this.auth.login();
  }

  async logout(): Promise<void> {
    await this.auth.logout();
  }
}

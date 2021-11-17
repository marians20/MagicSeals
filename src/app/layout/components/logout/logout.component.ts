import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from 'src/app/shared/models/user.model';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  private readonly _subscriptions: Subscription = new Subscription();
  isAuthenticated: boolean;
  user: User | undefined;
  constructor(private readonly auth: AuthService) {
    this.isAuthenticated = auth.isAuthenticated;
    this.user = this.auth.user;

    this._subscriptions.add(auth.onLoggedIn.subscribe((user) => {
      this.isAuthenticated = true;
      this.user = user;
    }));

    this._subscriptions.add(auth.onLoggedOut.subscribe(() => {
      this.isAuthenticated = false;
      this.user = undefined;
    }));
   }

  ngOnInit(): void {
  }

  logout(): void {
    this.auth.logout();
  }

}

import { AfterContentInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';
import { ToasterService } from 'src/app/shared/services/toaster.service';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterContentInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly socialAuthService: SocialAuthService,
    private readonly auth: AuthService,
    private readonly toaster: ToasterService,
    private readonly router: Router
  ) { }

  get isAuthenticated(): boolean {
    return this.auth.isAuthenticated;
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.socialAuthService.authState.subscribe((user) => {
      if(!user) {
        this.toaster.showError('Authentication error');
        return;
      }

      this.socialUser = user;
      this.auth.login();
      this.router.navigate(['seals']);
    });
  }

  ngAfterContentInit(): void {
    setTimeout(() => this.loginWithGoogle(), 1000);
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logOut(): void {
    this.socialAuthService.signOut();
    this.auth.logout();
  }

}

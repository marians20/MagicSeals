import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly sidebar: SidebarService,
    private readonly router: Router) { }

  ngOnInit(): void {
  }

  menuButtonClickHandle(): void {
    this.sidebar.toggle();
  }

  homeButtonClickHandle(): void {
    this.router.navigate(['/dashboard']);
  }

}

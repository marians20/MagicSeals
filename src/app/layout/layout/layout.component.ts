import { Component, OnInit } from '@angular/core';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sidebarOpened: boolean;
  constructor(private readonly sidebar: LayoutService) {
    this.sidebarOpened = sidebar.sidebarOpened;
    this.sidebar.onSidebarToggle.subscribe(opened => {
      this.sidebarOpened = opened;
    })
  }

  ngOnInit(): void {
  }

}

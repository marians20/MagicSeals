import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  sidebarOpened: boolean;
  constructor(private readonly sidebar: SidebarService) {
    this.sidebarOpened = sidebar.visible;
    this.sidebar.onToggle.subscribe(opened => {
      this.sidebarOpened = opened;
    })
  }

  ngOnInit(): void {
  }

}

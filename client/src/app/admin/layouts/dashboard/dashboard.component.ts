import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  navShown: boolean = true;
  subTableShown: boolean = false;

  toggleNav = () => {
    this.navShown = !this.navShown;
  };

  toggleSubTable = () => {
    this.subTableShown = !this.subTableShown;
  };
}

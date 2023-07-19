import { Component } from '@angular/core';
import { Route, Router, Routes } from '@angular/router';
import { DrawerItem, DrawerSelectEvent } from '@progress/kendo-angular-layout';
import { SVGIcon, bellIcon, calendarIcon, envelopLinkIcon, inboxIcon, menuIcon, starOutlineIcon } from '@progress/kendo-svg-icons';
import { StorageService } from '../p-layout/shared/services/storage.service';

const ProfileRoutes = [
  {
    path: 'history', 
    text: "Lịch sử mua hàng",
    svgIcon: inboxIcon
  },     
  {
    path: 'personalInfo',
    text: "Tài khoản của bạn",
    svgIcon: inboxIcon
  },
  {
    path: 'change-password',
    text: "Đổi mật khẩu",
    svgIcon: inboxIcon
  },
  {
    path: null,
    text: "Thoát tài khoản",
    svgIcon: inboxIcon
  },
];

@Component({
  selector: 'app-tnc-profile',
  templateUrl: './tnc-profile.component.html',
  styleUrls: ['./tnc-profile.component.scss']
})
export class TncProfileComponent {
  public selected = "Lịch sử mua hàng";
  public menuSvg: SVGIcon = menuIcon;
  public items: Array<{path: string, text: string, svgIcon: SVGIcon}> = ProfileRoutes;

  constructor(private storageService: StorageService) {}

  public onSelect(ev: DrawerSelectEvent): void {
    this.selected = ev.item.text;
    //TODO thực hiện log out 
    if (this.selected === 'Thoát tài khoản') {
      this.storageService.clean();
    }
  }
}

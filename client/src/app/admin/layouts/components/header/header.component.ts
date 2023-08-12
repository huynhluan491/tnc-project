import { Component } from '@angular/core';
import { StorageService } from 'src/app/p-app/p-layout/shared/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentUserName: string;

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.currentUserName = this.storageService.getUser().UserName;
    console.log(this.currentUserName);
  }

  user = { userName: 'Alex', avatar: 'assets/icon/cat.jpg' };
}

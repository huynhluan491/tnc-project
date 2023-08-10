import { AfterViewInit, Component, SkipSelf, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';
import { UserService } from '../../p-layout/shared/services/user.service';
import { StorageService } from '../../p-layout/shared/services/storage.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements AfterViewInit {
  @ViewChild('password') private password: TextBoxComponent;
  @ViewChild('repeatPassword') private repeatPassword: TextBoxComponent;

  constructor(
    @SkipSelf() private userService: UserService,
    @SkipSelf() private storageService: StorageService
  ) {}

  changePassWordForm: FormGroup = new FormGroup({
    PassWord: new FormControl(''),
    RepeatPassWord: new FormControl(''),
  });

  ngAfterViewInit(): void {
    this.password.input.nativeElement.type = 'password';
    this.repeatPassword.input.nativeElement.type = 'password';
  }

  updatePassword(): void {
    const password = this.changePassWordForm.get('PassWord').value;
    const repeat = this.changePassWordForm.get('RepeatPassWord').value;
    if (password == repeat) {
      const user = {
        Password: password,
      };
      const userID = this.storageService.getUser().UserID;
      this.userService.updateData(userID, user).subscribe((res) => {
        console.log(res);
      });
    }
  }

  public toggleVisibility(type: string): void {
    if (type === 'password') {
      const inputEl = this.password.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    } else {
      const inputEl = this.repeatPassword.input.nativeElement;
      inputEl.type = inputEl.type === 'password' ? 'text' : 'password';
    }
  }
}

import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TextBoxComponent } from '@progress/kendo-angular-inputs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements AfterViewInit {
  @ViewChild('password') private password: TextBoxComponent
  @ViewChild('repeatPassword') private repeatPassword: TextBoxComponent

  changePassWordForm: FormGroup = new FormGroup({
    PassWord: new FormControl(''),
    RepeatPassWord: new FormControl('')
  })

  ngAfterViewInit(): void {
    this.password.input.nativeElement.type = 'password';
    this.repeatPassword.input.nativeElement.type = 'password';
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

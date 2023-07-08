import { Component, Input, SkipSelf } from '@angular/core';
import { RegisterService } from '../../shared/services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  constructor(@SkipSelf() private registerService: RegisterService) {}

  @Input() isRegister: boolean = false;

  toggleShowRegister(): void {
    this.registerService.toggleRegisterShown();
  }

  toggleRegister(): void {
    this.isRegister = !this.isRegister;
  }
}

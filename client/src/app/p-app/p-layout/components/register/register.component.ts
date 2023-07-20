import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { RegisterService } from '../../shared/services/register.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { confirmPassword } from '../../shared/directives/registerationForm.directive';
import { AuthService } from 'src/app/p-app/http-interceptors/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { StorageService } from '../../shared/services/storage.service';
import { NotificationPopupService } from '../../shared/services/notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  isRegister: boolean = false;
  returnUrl: string = '';
  ngUnsubscribe = new Subject<void>();
  loginForm: FormGroup = new FormGroup({
    UserName: new FormControl(null, Validators.required),
    Password: new FormControl(null, Validators.required),
  });

  registerForm: FormGroup = new FormGroup(
    {
      UserName: new FormControl(null, Validators.required),
      Password: new FormControl(null, Validators.required),
      ConfirmPassword: new FormControl(null, Validators.required),
      Email: new FormControl(null, Validators.required),
    },
    { validators: confirmPassword }
  );

  constructor(
    @SkipSelf() private registerService: RegisterService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private storageService: StorageService,
    private notificationService: NotificationPopupService
  ) {
    // redirect to home if already logged in
    if (this.authService.currentUserValue) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() {
    return this.loginForm.controls;
  }

  toggleShowRegister(): void {
    this.registerService.toggleRegisterShown();
  }

  toggleRegister(): void {
    this.isRegister = !this.isRegister;
  }

  onSubmit(e: any): void {
    e.preventDefault();
    this.submitted = true;
    console.log(this.loginForm.value);

    if (this.isRegister && !this.registerForm.invalid) {
    } else if (!this.isRegister && !this.loginForm.invalid) {
      this.authService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(
          (data) => {
            if (data.Code === 200) {
              const { UserName, Address, Email, Phone, Point } = data.Data.User;
              const loggedInUser = {
                UserName,
                Email,
                Phone,
                Point,
                Address,
              };
              this.storageService.saveUser(loggedInUser);
              this.registerService.closeRegisterForm();
              this.reloadPage();
              this.notificationService.onSuccess('Đăng nhập thành công');
            } else {
              this.notificationService.onError('Đăng nhập thất bại');
            }
          },
          (error) => {
            this.notificationService.onError('Đăng nhập thất bại');
          }
        );
    }
  }

  reloadPage(): void {
    window.location.reload();
  }
}

import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { StorageService } from '../p-layout/shared/services/storage.service';
import { Subject, takeUntil } from 'rxjs';
import { VnCurrencyPipe } from '../p-layout/shared/pipe/vn-currency.pipe';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { DTOUser } from '../_models/DTOUser';
import { PaymentService } from '../p-layout/shared/services/payment.service';

@Component({
  selector: 'app-cart-checkout2',
  templateUrl: './cart-checkout2.component.html',
  styleUrls: ['./cart-checkout2.component.scss'],
})
export class CartCheckout2Component implements OnInit, OnDestroy {
  constructor(
    @SkipSelf() private storageService: StorageService,
    @SkipSelf() private paymentService: PaymentService,
    private formBuilder: FormBuilder
  ) {}

  deliverForm!: FormGroup;
  isRegister: boolean = false;
  total: number = 0;
  productList: number = 1;
  currentUser: DTOUser;
  isBindUserInfo: FormControl = new FormControl(false);
  ngUnsubscribe$ = new Subject<void>();
  amount = 0;
  products = [];
  onSubmit() {}

  ngOnInit() {
    this.loadDeliverForm();
    this.currentUser = this.storageService.getUser();

    const orders = this.storageService.getOrders().orders;
    orders && (this.products = orders);
    orders?.forEach((product) => {
      this.total += product.Price * product.Amount;
    });
    this.amount = this.storageService.getOrders().totalAmount;
    this.isBindUserInfo.valueChanges
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        if (this.isBindUserInfo.value && this.currentUser) {
          this.deliverForm.patchValue({
            name: this.currentUser.FullName,
            email: this.currentUser.Email,
            number: this.currentUser.Phone,
            address: this.currentUser.Address,
          });
          console.log(this.deliverForm.value);
        } else {
          this.deliverForm.reset();
        }
      });
  }

  checkOut() {
    const body = {
      TypeOfPayment: 'VNPAY',
      DataInOrder: [
        {
          ProductID: 3,
          Price: 12440000,
          Amount: 1,
        },
      ],
    };
    this.paymentService
      .checkOut(body)
      .pipe(takeUntil(this.ngUnsubscribe$))
      .subscribe((res) => {
        window.location.href = res.PaymentUrl;
      });
  }

  loadDeliverForm() {
    this.deliverForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      payment_method: ['cod'],
    });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe$.next();
    this.ngUnsubscribe$.complete();
  }
}

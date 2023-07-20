import { Component, OnInit, SkipSelf } from '@angular/core';
import { StorageService } from '../p-layout/shared/services/storage.service';
import { Subject, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart-checkout2',
  templateUrl: './cart-checkout2.component.html',
  styleUrls: ['./cart-checkout2.component.scss'],
})
export class CartCheckout2Component implements OnInit {
  constructor(
    @SkipSelf() private storageService: StorageService,
    private formBuilder: FormBuilder
  ) {}

  deliverForm!: FormGroup;
  isRegister: boolean = false;

  productList: number = 1;

  onSubmit() {}

  ngOnInit() {
    this.deliverForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      number: ['', [Validators.required]],
      address: ['', [Validators.required]],
      payment_method: ['', [Validators.required]],
    });

    const userData = this.storageService.getUser();
    console.log(userData);
  }
}

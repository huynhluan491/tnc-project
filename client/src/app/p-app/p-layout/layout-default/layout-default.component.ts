import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { RegisterService } from '../shared/services/register.service';
import { StorageService } from '../shared/services/storage.service';

@Component({
  selector: 'layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefault implements OnInit, OnDestroy {
  cartPopUpState: boolean = false;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  registerShown$ = this.registerService.registerShown$;
  isLoggedIn: boolean = false;

  constructor(
    private cartService: CartService,
    @SkipSelf() private registerService: RegisterService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    // console.log(this.isLoggedIn);

    this.cartService
      .getIsCartPopUpState()
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((state) => {
        this.cartPopUpState = state;
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

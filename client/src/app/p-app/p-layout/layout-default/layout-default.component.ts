import { Component, OnDestroy, OnInit, SkipSelf } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Subject, takeUntil } from 'rxjs';
import { RegisterService } from '../shared/services/register.service';

@Component({
  selector: 'layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefault implements OnInit, OnDestroy {
  cartPopUpState: boolean = false;
  ngUnsubscribe: Subject<void> = new Subject<void>();
  registerShown$ = this.registerService.registerShown$;

  constructor(
    private cartService: CartService,
    @SkipSelf() private registerService: RegisterService
  ) {}

  ngOnInit(): void {
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

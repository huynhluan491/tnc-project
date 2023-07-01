import { Component, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../shared/services/cart.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'layout-default',
  templateUrl: './layout-default.component.html',
  styleUrls: ['./layout-default.component.scss'],
})
export class LayoutDefault implements OnInit, OnDestroy {
  cartPopUpState: boolean = false;
  ngUnsubscribe: Subject<void> = new Subject<void>();

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getIsCartPopUpState().pipe(takeUntil(this.ngUnsubscribe)).subscribe(state => {
      this.cartPopUpState = state;
    }
    )
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productList: number = 1;

  @Input() checkout: boolean = false;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit(): void {}

  redirectToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  onCloseCartPopUp() {
    this.cartService.onToggleCartPopUpState(false);
  }
}

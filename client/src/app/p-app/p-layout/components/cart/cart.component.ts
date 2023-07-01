import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productList: number = 1;

  @Input() checkout: boolean = false;

  constructor(private cartService: CartService) { }

  ngOnInit(): void { }

  onCloseCartPopUp() {
    this.cartService.onToggleCartPopUpState(false);
  }
}

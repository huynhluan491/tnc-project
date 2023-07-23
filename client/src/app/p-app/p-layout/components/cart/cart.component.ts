import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';
import { DTOOrder } from '../../shared/dto/DTOOrder';
import { StorageService } from '../../shared/services/storage.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productList: [DTOOrder] | [] = [];

  @Input() checkout: boolean = false;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    this.productList = this.storageService.getOrders();
  }

  redirectToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  onCloseCartPopUp() {
    this.cartService.onToggleCartPopUpState(false);
  }
}

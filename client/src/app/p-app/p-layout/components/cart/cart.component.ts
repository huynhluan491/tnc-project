import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';
import { DTOOrder } from '../../shared/dto/DTOOrder';
import { StorageService } from '../../shared/services/storage.service';
import { ProductService } from '../../shared/services/product.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productList: [DTOOrder] | [] = [];
  ngUnsubscribe = new Subject<void>();
  @Input() checkout: boolean = false;

  constructor(
    @SkipSelf() private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders() {
    const orders = this.storageService.getOrders().orders;
    for (let product of orders) {
      this.getProductImage(product.Image)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((imageSrc) => {
          product.ImageSrc = imageSrc;
        });
    }
    this.productList = orders;
  }

  getProductImage(imageName: string) {
    return this.productService.getProductImage(imageName);
  }

  getTotalProducts() {
    return this.storageService.getOrders().totalAmount;
  }

  redirectToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  onCloseCartPopUp() {
    this.cartService.onToggleCartPopUpState(false);
  }
}

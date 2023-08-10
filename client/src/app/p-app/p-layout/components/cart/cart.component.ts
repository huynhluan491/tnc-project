import { Component, Input, OnInit, SkipSelf } from '@angular/core';
import { CartService } from '../../shared/services/cart.service';
import { Router } from '@angular/router';
import { DTOOrder } from '../../shared/dto/DTOOrder';
import { StorageService } from '../../shared/services/storage.service';
import { ProductService } from '../../shared/services/product.service';
import { Subject, takeUntil } from 'rxjs';
import { OrderService } from '../../shared/services/order.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  productList = [];
  ngUnsubscribe = new Subject<void>();
  total: number = 0;
  @Input() checkout: boolean = false;

  constructor(
    @SkipSelf() private productService: ProductService,
    private storageService: StorageService,
    private router: Router,
    private cartService: CartService,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.getOrders();
  }

  decreaseItem(product) {
    const updatedAmount = product.Amount - 1;
    console.log(updatedAmount);

    if (updatedAmount == 0) {
      let orders = this.storageService.getOrders();
      orders.orders = orders.orders.filter(
        (item) => item.ProductID !== product.productID
      );
      this.storageService.saveOrders(orders);
      this.productList = orders;
    }
    // const orderId = this.storageService.getOrders().OrderID;
    // const order = {
    //   Amount: updatedAmount,
    //   Order: orderId,
    //   ProductID: product.ProductID,
    // };
    // console.log(order);

    // this.orderService.updateData(order).subscribe((res) => {
    //   console.log(res);
    // });
  }

  getOrders() {
    const orders = this.storageService.getOrders().orders;

    orders.forEach((product) => {
      this.total += product.Price * product.Amount;
      this.getProductImage(product.Image)
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((res) => {
          product.ImageSrc = res.Data.Base64;
        });
    });
    this.productList = orders;
  }

  getProductImage(imageName: string) {
    return this.productService.getProductImage(imageName);
  }

  getTotalProducts() {
    const amount = this.storageService.getOrders().totalAmount;
    return amount ? amount : 0;
  }

  redirectToCheckout() {
    this.router.navigateByUrl('/checkout');
  }

  onCloseCartPopUp() {
    this.cartService.onToggleCartPopUpState(false);
  }
}

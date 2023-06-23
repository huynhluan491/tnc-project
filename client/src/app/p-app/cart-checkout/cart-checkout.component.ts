import { Component } from '@angular/core';
import { LayoutAPIService } from '../p-layout/shared/services/layout-api.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-cart-checkout',
  templateUrl: './cart-checkout.component.html',
  styleUrls: ['./cart-checkout.component.scss'],
})
export class CartCheckoutComponent {
  sliderProducts: any[] = [];
  products$ = this.layoutAPIService.GetProducts().pipe(
    map((products) => {
      return products.slice(0, 15);
    })
  );
  constructor(private layoutAPIService: LayoutAPIService) {}
}

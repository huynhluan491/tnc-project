import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefault } from './layout-default/layout-default.component';
import { HomeComponent } from '../home/home.component';
import { ProductComponent } from '../product/product.component';
import { CartComponent } from './components/cart/cart.component';
import { CartCheckoutComponent } from '../cart-checkout/cart-checkout.component';
import { OrderCheckoutComponent } from '../order-checkout/order-checkout.component';
import { CartCheckout2Component } from '../cart-checkout2/cart-checkout2.component';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutDefault,
    children: [
      { path: '', component: HomeComponent },
      {
        path: 'product',
        loadChildren: () =>
          import('../product/product.module').then((m) => m.ProductModule),
      },
      {
        path: 'cart',
        component: CartCheckoutComponent,
        // children: [],
      },
      {
        path: 'checkout',
        component: CartCheckout2Component,
      },
    ],
  },
  {
    path: 'orderCheckout',
    component: OrderCheckoutComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(LayoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

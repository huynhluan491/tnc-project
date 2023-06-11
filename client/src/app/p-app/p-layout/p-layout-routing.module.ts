import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefault } from './layout-default/layout-default.component';
import { HomeComponent } from '../home/home.component';
import { ProductComponent } from '../product/product.component';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutDefault,
    children: [
      { path: '', component: HomeComponent },
      { path: ':categoryname', component: ProductComponent }
      // { path: 'laptop', component: ProductComponent },
      // { path: 'headphone', component: ProductComponent },
      // { path: 'keyboard', component: ProductComponent },
      // { path: 'laptop', component: ProductComponent },
      // { path: 'networkdevice', component: ProductComponent },
      // { path: 'phone', component: ProductComponent },
      // { path: 'tablet', component: ProductComponent },
      // { path: 'watch', component: ProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LayoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule { }

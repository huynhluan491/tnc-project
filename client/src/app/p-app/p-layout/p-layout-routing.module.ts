import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefault } from './layout-default/layout-default.component';
import { HomeComponent } from '../home/home.component';

export const LayoutRoutes: Routes = [
  {
    path: '',
    component: LayoutDefault,
    children: [{ path: '', component: HomeComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(LayoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutDefault } from './layout-default/layout-default.component';

export const LayoutRoutes: Routes = [{ path: '', component: LayoutDefault }];

@NgModule({
  imports: [RouterModule.forChild(LayoutRoutes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}

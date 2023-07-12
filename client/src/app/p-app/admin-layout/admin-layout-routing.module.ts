import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
  
];

@NgModule({
  imports: [RouterModule.forChild(AdminLayoutRoutes)],
  exports: [RouterModule],
})
export class AdminLayoutRoutingModule { }

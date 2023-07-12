import {
    NgModule,
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA,
  } from '@angular/core';
  import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout.component';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { ProductListComponent } from './product-list/product-list.component';
import { OrderManagmentComponent } from './order-managment/order-managment.component';
  
  @NgModule({
    declarations: [AdminLayoutComponent, ProductListComponent, OrderManagmentComponent],
    imports: [CommonModule, PLayoutModule],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [],
  })
  export class AdminLayoutModule { }
  
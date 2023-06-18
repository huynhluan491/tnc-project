import { GridModule } from '@progress/kendo-angular-grid';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductRoutingModule } from './product-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { BoxProductModule } from '../p-layout/components/boxProduct/boxProduct.module';
import { NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [ProductComponent, ProductDetailComponent, ProductListComponent],
  imports: [CommonModule, PLayoutModule, ProductRoutingModule,GridModule,BoxProductModule,NgxPaginationModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [],
})
export class ProductModule { }


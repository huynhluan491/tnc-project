import { ProductAPIService } from './shared/services/product-api.service';
import { ProductListComponent } from './product-list/product-list.component';
import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { PLayoutModule } from '../p-layout/p-layout.module';
import { BoxProductModule } from '../p-layout/components/boxProduct/boxProduct.module';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  declarations: [ProductComponent,],
  imports: [CommonModule, PLayoutModule,BoxProductModule,GridModule ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [],
})
export class ProductModule { }


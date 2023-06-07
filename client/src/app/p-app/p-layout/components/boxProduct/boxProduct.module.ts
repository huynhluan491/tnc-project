import { CUSTOM_ELEMENTS_SCHEMA, NgModule ,NO_ERRORS_SCHEMA} from '@angular/core';
import { BoxProductComponent } from './boxProduct.component';
import { DecimalPipe } from '@angular/common';
import { BuyNowComponent } from './btnBuyNow/buyNow.component';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations :[BoxProductComponent,BuyNowComponent],
  imports :[DecimalPipe,NgbRating],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [BoxProductComponent,BuyNowComponent],

})
export class BoxProductModule{}

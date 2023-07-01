import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, } from "@angular/core";
import { CommonModule } from '@angular/common';
import { OrderCheckoutComponent } from "./order-checkout.component";
import { PLayoutModule } from "../p-layout/p-layout.module";

@NgModule({
    declarations: [
        OrderCheckoutComponent
    ],
    imports: [
        CommonModule,
        PLayoutModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
    exports: [],
})
export class OrderCheckoutModule { }
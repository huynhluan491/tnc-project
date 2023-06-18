import { NgModule } from "@angular/core";
import { ProductListComponent } from "./product-list.component";
import { GridModule } from "@progress/kendo-angular-grid";
import { BoxProductModule } from "../../p-layout/components/boxProduct/boxProduct.module";

@NgModule({
  declarations :[ProductListComponent],
  imports :[GridModule,BoxProductModule],
  exports :[ProductListComponent]
})
export class listproductmodule{}

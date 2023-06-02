import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from "@angular/core";
import { TitleComponent } from "./title.component";

@NgModule({
  declarations : [TitleComponent],
  imports :[],
  schemas :[CUSTOM_ELEMENTS_SCHEMA,NO_ERRORS_SCHEMA],
  exports :[TitleComponent]
})
export class TitleModule{}

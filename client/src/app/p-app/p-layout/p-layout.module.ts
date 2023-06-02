import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefault } from './layout-default/layout-default.component';
import { LayoutRoutingModule } from './p-layout-routing.module';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [LayoutDefault, HeaderComponent],
  imports: [CommonModule, LayoutRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [LayoutDefault, HeaderComponent],
})
export class PLayoutModule {}

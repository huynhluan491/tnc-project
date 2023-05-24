import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefault } from './layout-default/layout-default.component';
import { RouterModule } from '@angular/router';
import { LayoutRoutes } from './p-layout-routing.module';

@NgModule({
  declarations: [LayoutDefault],
  imports: [CommonModule, RouterModule.forChild(LayoutRoutes)],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [LayoutDefault],
})
export class PLayoutModule {}

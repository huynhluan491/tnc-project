import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefault } from './layout-default/layout-default.component';
import { LayoutRoutingModule } from './p-layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HorizontalBannerComponent } from './components/p-banner/banner.component';
import { TitleComponent } from './components/p-title/title.component';

@NgModule({
  declarations: [
    LayoutDefault,
    HeaderComponent,
    TitleComponent,
    HorizontalBannerComponent,
  ],
  imports: [CommonModule, LayoutRoutingModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    LayoutDefault,
    HeaderComponent,
    TitleComponent,
    HorizontalBannerComponent,
  ],
})
export class PLayoutModule {}

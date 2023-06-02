import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { TitleComponent } from '../p-layout/components/p-title/title.component';
import { HorizontalBannerComponent } from '../p-layout/components/p-banner/banner.component';

@NgModule({
  declarations: [HomeComponent,TitleComponent,HorizontalBannerComponent],
  imports: [CommonModule,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [HomeComponent,TitleComponent,HorizontalBannerComponent],
})
export class HomeModule {}

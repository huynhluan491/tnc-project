import {
  NgModule,
  CUSTOM_ELEMENTS_SCHEMA,
  NO_ERRORS_SCHEMA,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefault } from './layout-default/layout-default.component';
import { LayoutRoutingModule } from './p-layout-routing.module';
import { HeaderComponent } from './components/header/header.component';
import { HorizontalBannerComponent } from './components/banner/banner.component';
import { TitleComponent } from './components/title/title.component';
import { FooterComponent } from './components/footer/footer.component';
import { SliderContainerComponent } from './components/slider-container/slider-container.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { CategoryItemComponent } from './components/category-item/category-item.component';
import { BoxProductModule } from './components/boxProduct/boxProduct.module';
import { MenusModule } from '@progress/kendo-angular-menu';
import { BrowserModule } from '@angular/platform-browser';
import { ProductComponent } from '../product/product.component';
@NgModule({
  declarations: [
    LayoutDefault,
    HeaderComponent,
    TitleComponent,
    HorizontalBannerComponent,
    FooterComponent,
    SliderContainerComponent,
    CategoryItemComponent,
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SlickCarouselModule,
    BoxProductModule,
    MenusModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  exports: [
    LayoutDefault,
    HeaderComponent,
    TitleComponent,
    HorizontalBannerComponent,
    FooterComponent,
    SlickCarouselModule,
    SliderContainerComponent,
    CategoryItemComponent,
  ],
})
export class PLayoutModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PLayoutModule } from './p-app/p-layout/p-layout.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClientXsrfModule,
} from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@progress/kendo-angular-icons';
import { GridModule } from '@progress/kendo-angular-grid';
import { HomeModule } from './p-app/home/home.module';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { CartCheckoutComponent } from './p-app/cart-checkout/cart-checkout.component';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { OrderCheckoutModule } from './p-app/order-checkout/order-checkout.module';
import { CartCheckout2Component } from './p-app/cart-checkout2/cart-checkout2.component';
import { TncProfileModule } from './p-app/tnc-profile/tnc-profile.module';
import { JWTInterceptor } from './p-app/_helpers/jwt.interceptor';
import { ErrorInterceptor } from './p-app/_helpers/error.interceptor';
import { httpInterceptorProviders } from './p-app/_helpers/http.interceptor';
import { NotificationModule } from '@progress/kendo-angular-notification';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent, CartCheckoutComponent, CartCheckout2Component],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PLayoutModule,
    HomeModule,
    HttpClientModule,
    NgbModule,
    IconsModule,
    GridModule,
    ButtonsModule,
    LayoutModule,
    DropDownsModule,
    OrderCheckoutModule,
    NotificationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrf_access_token',
      headerName: 'csrf-token',
    }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
  })
export class AppModule {}

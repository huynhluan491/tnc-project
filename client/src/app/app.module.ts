import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './p-app/home/home.module';
import { PLayoutModule } from './p-app/p-layout/p-layout.module';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IconsModule } from '@progress/kendo-angular-icons';
import { ProductModule } from './p-app/product/product.module';
import { GridModule } from '@progress/kendo-angular-grid';




@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, PLayoutModule, HttpClientModule, NgbModule, IconsModule, GridModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
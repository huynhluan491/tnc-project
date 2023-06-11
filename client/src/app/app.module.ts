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



@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, HomeModule, PLayoutModule, HttpClientModule, NgbModule, IconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
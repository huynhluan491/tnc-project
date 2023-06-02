import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './p-app/home/home.module';
import { PLayoutModule } from './p-app/p-layout/p-layout.module';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HomeModule, PLayoutModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

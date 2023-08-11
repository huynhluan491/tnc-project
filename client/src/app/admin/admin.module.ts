import { NgModule } from '@angular/core';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { SubTableComponent } from './layouts/components/sub-table/sub-table.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { NavMenuComponent } from './layouts/components/nav-menu/nav-menu.component';
import { HeaderComponent } from './layouts/components/header/header.component';
import { MainTableComponent } from './layouts/components/main-table/main-table.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    DashboardComponent,
    NavMenuComponent,
    HeaderComponent,
    SubTableComponent,
    MainLayoutComponent,
    MainTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ],
  exports: [
    DashboardComponent,
    NavMenuComponent,
    HeaderComponent,
    MainTableComponent,
    SubTableComponent,
    MainLayoutComponent,
  ]
})
export class AdminModule { }
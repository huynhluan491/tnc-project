import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './p-app/admin-layout/admin-layout.component';
import { MainLayoutComponent } from './admin/layouts/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/p-app/p-layout/p-layout.module').then(
        (m) => m.PLayoutModule
      ),
  },
  {
    path: 'admin',
    component: MainLayoutComponent,
    loadChildren: () => import('./admin/admin.module').then((m) => m.AdminModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ], //back to top when route changed
  exports: [RouterModule],
})
export class AppRoutingModule {}

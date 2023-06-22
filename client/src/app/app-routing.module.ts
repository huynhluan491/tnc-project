import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../app/p-app/p-layout/p-layout.module').then(
        (m) => m.PLayoutModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ], //back to top when route changed
  exports: [RouterModule],
})
export class AppRoutingModule {}

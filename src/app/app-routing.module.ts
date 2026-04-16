import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { AdminProductControlComponent } from './admin-product-control/admin-product-control.component';
import { MenuCreateComponent } from './menu-create/menu-create.component';
import { MenuDeleteComponent } from './menu-delete/menu-delete.component';
import { MenuEditComponent } from './menu-edit/menu-edit.component';

import { MenuComponent } from './menu/menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu/restaurant', pathMatch: 'full' },
  { path: 'menu/restaurant', component: MenuComponent },
  { path: 'admin/login', component: LoginPageComponent },
  { path: 'admin/product-control', component: AdminProductControlComponent },
  { path: 'menu/create', component: MenuCreateComponent },
  { path: 'menu/delete', component: MenuDeleteComponent },
  { path: 'menu/edit/:id', component: MenuEditComponent },
  { path: '**', redirectTo: 'menu/restaurant' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

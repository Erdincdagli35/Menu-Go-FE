import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { BeachMenuComponent } from './beach-menu/beach-menu.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu/restaurant', pathMatch: 'full' },
  { path: 'menu/restaurant', component: MenuComponent },
  { path: 'menu/beach', component: BeachMenuComponent },
  { path: '**', redirectTo: 'menu/restaurant' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

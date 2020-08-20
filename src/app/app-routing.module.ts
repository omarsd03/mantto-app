import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesComponent } from './pages/pages.component';
import { AuthRoutingModule } from './auth/auth.routing';

import { PagenotfoundComponent } from './shared/pagenotfound/pagenotfound.component';

const routes: Routes = [
  { path: '', component: PagesComponent, loadChildren: './pages/pages.module#PagesModule'},
  { path: '**', component: PagenotfoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true}), AuthRoutingModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }

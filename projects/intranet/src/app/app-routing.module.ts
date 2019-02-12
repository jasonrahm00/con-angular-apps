import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'sidenav', redirectTo: 'sidenav', pathMatch: 'full'},
  { path: 'sidenav/home', redirectTo: 'sidenav', pathMatch: 'full'},
  { path: '', redirectTo: 'standard', pathMatch: 'full' },
  { path: '**', redirectTo: 'standard', pathMatch: 'full'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }

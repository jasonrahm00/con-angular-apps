import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SidenavTemplateComponent } from './sidenav-template.component';
import { FormsComponent } from '../components/forms/forms.component';
import { HomeComponent } from '../components/home/home.component';

const sidenavRoutes: Routes = [
  {
    path: 'sidenav',
    component: SidenavTemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'forms',
        component: FormsComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(sidenavRoutes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }

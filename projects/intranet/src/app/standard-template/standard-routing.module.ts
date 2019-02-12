import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StandardTemplateComponent } from './standard-template.component';
import { FormsComponent } from '../components/forms/forms.component';
import { HomeComponent } from '../components/home/home.component';

const standardRoutes: Routes = [
  {
    path: 'standard',
    component: StandardTemplateComponent,
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
  imports: [
    RouterModule.forChild(standardRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class StandardRoutingModule { }

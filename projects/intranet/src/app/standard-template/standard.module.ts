import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SharedComponentsModule } from '../shared-components.module';
import { StandardRoutingModule } from './standard-routing.module';
import { StandardTemplateComponent } from './standard-template.component';
import { MainNavComponent } from '../components/main-nav/main-nav.component';
import { MaterialModule } from '../material.module';

@NgModule({
  declarations: [
    StandardTemplateComponent,
    MainNavComponent
  ],
  imports: [
    CommonModule,
    SharedComponentsModule,
    StandardRoutingModule,
    MaterialModule,
    BrowserAnimationsModule
  ]
})
export class StandardModule { }

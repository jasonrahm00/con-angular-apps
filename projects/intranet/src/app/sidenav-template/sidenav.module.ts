import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedComponentsModule } from '../shared-components.module';
import { SidenavTemplateComponent } from './sidenav-template.component';
import { SidenavRoutingModule } from './sidenav-routing.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    SharedComponentsModule,
    SidenavRoutingModule,
    MaterialModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [SidenavTemplateComponent]
})
export class SidenavModule { }

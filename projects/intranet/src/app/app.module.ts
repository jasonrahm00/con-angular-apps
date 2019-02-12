import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { SidenavModule } from './sidenav-template/sidenav.module';
import { StandardModule } from './standard-template/standard.module';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';

@NgModule({

  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StandardModule,
    SidenavModule,
    AppRoutingModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [AppComponent]
})
export class AppModule { }

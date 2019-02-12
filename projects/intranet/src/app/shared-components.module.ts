import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopDocumentsComponent } from './components/home/top-documents/top-documents.component';
import { FormsComponent } from './components/forms/forms.component';
import { HomeComponent } from './components/home/home.component';
import { QuickLinksComponent } from './components/home/quick-links/quick-links.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TopDocumentsComponent,
    FormsComponent,
    HomeComponent,
    QuickLinksComponent,
    NavHeaderComponent,
    FooterComponent
  ],
  exports: [
    TopDocumentsComponent,
    FormsComponent,
    HomeComponent,
    QuickLinksComponent,
    NavHeaderComponent,
    FooterComponent
  ]
})
export class SharedComponentsModule { }

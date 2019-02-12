import { Component, OnInit } from '@angular/core';

@Component({
  template:  `
    <app-main-nav></app-main-nav>
    <div id="routerOutlet">
      <router-outlet></router-outlet>
    </div>
    <app-footer></app-footer>
  `
})
export class StandardTemplateComponent { }

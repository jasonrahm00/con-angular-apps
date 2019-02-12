import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { trigger, state, style, animate, transition } from '@angular/animations';

import { TopDocumentsComponent } from './top-documents/top-documents.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  visbileSubmenu = false;
  title = 'MyCON';

  constructor(private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
  }

  toggleSubmenu() {
    this.visbileSubmenu = !this.visbileSubmenu;
  }

}

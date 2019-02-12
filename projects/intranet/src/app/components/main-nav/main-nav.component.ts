import { Component, OnInit } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  activeParent;
  active = false;

  constructor() { }

  ngOnInit() {
  }

  toggleActive(x) {
    if(this.activeParent === x) {
      this.active = !this.active;
    } else {
      this.activeParent = x;
      this.active = true;
    }
  }

}

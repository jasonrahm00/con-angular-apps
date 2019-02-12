import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Announcement } from '../../classes/announcement';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {

  dataLoaded: boolean = false;
  loadError: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}

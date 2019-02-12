import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { Filter } from '../../classes/filter';
import { Announcement } from '../../classes/announcement';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.css']
})
export class FiltersComponent implements OnInit {

  filteredAnnounce: Announcement[] = [];
  
  constructor() { }

  ngOnInit() {
  }

}

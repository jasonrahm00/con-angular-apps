import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { GetDataService } from './get-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  knowledge: any = [];
  filterValues;
  filteredKnowledge: any = [];
  selectedFilter = 'All';
  dataLoaded = false;

  constructor(private getDataService: GetDataService) { }

  ngOnInit() {
    this.getDataService.getKnowledge();
    this.getDataService.knowledge.subscribe(data => {
      if (data.length > 0) {
        this.knowledge = data;
        this.filteredKnowledge = data;
        this.createFilter(data);
        this.dataLoaded = true;
      } else {
        this.dataLoaded = false;
      }
    });
  }

  createFilter(x) {
    let filters = [];
    x.forEach(elem => {
      if(filters.indexOf(elem.category) === -1) {
        filters.push(elem.category);
      }
    });
    filters.sort();
    this.filterValues = filters;
  }

  onSelectionChange(value) {
    this.selectedFilter = value;
    let results = [];

    if (value === 'All') {
      results = this.knowledge;
    } else {
      this.knowledge.forEach(elem => {
        if (elem.category === value)
          results.push(elem);
      });
    }

    this.filteredKnowledge = results;
  }

}

// Test deploy url: https://mycon.ucdenver.edu/test/SiteAssets/styles-scripts/it-knowledge/

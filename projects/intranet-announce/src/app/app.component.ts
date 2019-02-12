import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";

import { GetDataService } from './get-data.service';
import { Announcement } from './classes/announcement';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  announcements: Announcement[];
  loadError = false;
  dataLoaded = false;

  public constructor(
    private getDataService: GetDataService
  ) { }

  ngOnInit() {
    this.getDataService.getAnnounce();
    this.getDataService.announce.subscribe(data => {
      if (data[0].title !== "Default" && data.length > 0) {
        this.announcements = data;
        this.loadError = false;
        this.dataLoaded = true;
        console.log(this.announcements);
      } else {
        this.loadError = true;
      }
    });
  }

}

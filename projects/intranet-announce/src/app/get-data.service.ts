import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable,  BehaviorSubject } from "rxjs";

import { Announcement } from './classes/announcement';

const currentPage = window.location.href,
      hrUrlString = 'human-resources',
      listUrl = 'https://mycon.ucdenver.edu/_vti_bin/listdata.svc/InternalAnnouncements',
      now = Date.now();

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  announce = new BehaviorSubject<Announcement[]>([new Announcement("Default","","","","")]);

  constructor(private http: HttpClient) { }

  getAnnounce() {
   this.http.get(listUrl)
    .subscribe(
      (data: any) => {

        function getNum(str) {
          return str.replace(/\D/g,"");
        }

        function addDay(x) {
          if (x !== null) {
            var spDate = new Date(parseInt(x));
            return spDate.setDate(spDate.getDate() + 1).toString();
          } else {
            return null;
          }
        }

        let announcements: Announcement[] = [];

        data.d.results.forEach(function(value) {

          if(value.CategoryValue !== 'Dean Message') {

            let expires = value.Expires !== null ? getNum(value.Expires) : null,
                publishDate = value.PublishDate !== null ? getNum(value.PublishDate) : null;

            if ((publishDate === null || publishDate < now) && (expires === null || expires > now)){
              announcements.push(new Announcement(
                value.Announcement,
                value.CategoryValue,
                value.Description,
                expires,
                addDay(publishDate)
              ));
            }

          }

        });

        this.announce.next(announcements);

      },
      (error: any) => console.error(error)
    );
  }

}

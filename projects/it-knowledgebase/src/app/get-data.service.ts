import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, BehaviorSubject } from "rxjs";
import { catchError, map } from 'rxjs/operators';

const textUrl = "https://mycon.ucdenver.edu/_api/web/lists/GetByTitle('Knowledge Base')/items?$Filter=Department eq 'Information Technology'",
      parseString = require('xml2js').parseString;

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  knowledge = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) { }

  getKnowledge() {
    this.http.get(textUrl, {responseType: 'text'}).subscribe(data => {

      let response = [];
      let xmlString = data;

      xmlString = xmlString.replace(/m:|d:/g, '');

      parseString(xmlString, function(err, result) {
        response = result.feed.entry;
      });

      response = response.map(x => {
        return {
          "url": x.content[0].properties[0].URL[0].Url[0],
          "title": x.content[0].properties[0].URL[0].Description[0],
          "description": x.content[0].properties[0].Comments[0] ? x.content[0].properties[0].Comments[0] : null,
          "category": x.content[0].properties[0].Category[0].element[0]
        }
      });

      response.sort((a,b) => {

        if (a.title < b.title)
          return -1;

        if (a.title > b.title)
          return 1;

        return 0;

      });

      this.knowledge.next(response);

    }, error => console.error(error));
  }

}

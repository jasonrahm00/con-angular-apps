import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable,  BehaviorSubject } from "rxjs";

import { Assignment } from "../classes/assignment";
import { Course } from "../classes/course";
import { Fund } from "../classes/fund";
import { Comment } from "../classes/comment";

@Injectable()
export class GetDataService {

  // https://blog.kevinchisholm.com/angular2/angular2-http-observables-five-minutes/
  courseAssigns = new BehaviorSubject<Assignment[]>([]);
  fundingData = new BehaviorSubject<Fund>(new Fund([], 0, 0));
  comments = new BehaviorSubject<Comment>(new Comment(null, null));
  fte = new BehaviorSubject<any>([{}]);
  url = "api/get_data.php";

  private empID = new BehaviorSubject<string>("");
  empID$ = this.empID.asObservable();
  id = this.empID$.subscribe(data => this.id = data);

  constructor(private http: HttpClient) { }

  getFacultyList(): Observable<any> {
    return this.http.get<any>(this.url, {params: new HttpParams().set("dataset", "faculty")});
  }

  getCourseList(): Observable<Course[]> {
    return this.http.get<Course[]>(this.url, {params: new HttpParams().set("dataset", "courses")});
  }

  getCourseAssigns() {
    const httpParams = new HttpParams()
      .set("dataset", "assigns")
      .set("id", this.id);
    this.http.get(this.url, {params: httpParams})
      .subscribe(
        (data: any) => this.courseAssigns.next(data),
        (error: any) => console.error(error)
      );
  }

  getFundingData() {
    const httpParams = new HttpParams()
      .set("dataset", "funding")
      .set("id", this.id);
    this.http.get(this.url, {params: httpParams})
      .subscribe(
        (data: any) => this.fundingData.next(data),
        (error: any) => console.error(error)
      );
  }

  getComments() {
    const httpParams = new HttpParams()
      .set("dataset", "comments")
      .set("id", this.id);
    this.http.get(this.url, {params: httpParams})
      .subscribe(
        (data: any) => this.comments.next(data),
        (error: any) => console.error(error)
      );
  }

  getFTE() {
    const httpParams = new HttpParams()
      .set("dataset", "fte")
      .set("id", this.id);
    this.http.get(this.url, {params: httpParams})
      .subscribe(
        (data: any) => this.fte.next(data),
        (error: any) => console.error(error)
      );
  }

  getFacultyData(id) {
    this.empID.next(id);
    this.empID$.subscribe(() => {
      this.getComments();
      this.getCourseAssigns();
      this.getFundingData();
      this.getFTE();
    });

  }

}

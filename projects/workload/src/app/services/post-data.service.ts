import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Assignment } from "../classes/assignment";
import { Comment } from "../classes/comment";

@Injectable()
export class PostDataService {

  fileRoot = "api/post-data/";

  constructor(private http: HttpClient) { }

  addAssign(newAssign: Assignment): Observable<Assignment> {
    return this.http.post<Assignment>(this.fileRoot + "add_assign.php", newAssign);
  }

  deleteAssign(empID, assign): Observable<any> {
    return this.http.post(this.fileRoot + "delete_assign.php", [empID, assign.assignID]);
  }

  saveAssignEdit(assign: Assignment) {
    return this.http.post<Assignment>(this.fileRoot + "edit_assign.php", assign);
  }

  saveComments(comments: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.fileRoot + "save_comment.php", comments);
  }

}

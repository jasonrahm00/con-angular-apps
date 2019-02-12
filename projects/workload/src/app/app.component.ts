import { Component, OnInit } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { Observable } from "rxjs";

import { GetDataService } from "./services/get-data.service";
import { Comment } from "./classes/comment";
import { PostDataService } from "./services/post-data.service";
import { MessageService } from "./services/message.service";
import { Message } from "./classes/message";

export class Comments {
  constructor(
    public text: string
  ) { }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {

  title = "Faculty Workload";
  dateTime: number = Date.now();
  globalComments: Comment;
  commentToEdit: Comment = this.commentDefault();
  empID = "";

  public constructor(
    private titleService: Title,
    private getDataService: GetDataService,
    private postDataService: PostDataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.titleService.setTitle(this.title);
    this.getDataService.comments.subscribe(data => this.globalComments = data);
    this.getDataService.empID$.subscribe(data => this.empID = data);
  }

  commentDefault() {
    return new Comment(null, this.empID, false);
  }

  editComment() {
    this.commentToEdit = Object.assign({}, this.globalComments);
    this.commentToEdit.editing = true;
  }

  cancelEdit() {
    this.commentToEdit = new Comment(null, this.empID, false, []);
  }

  saveComment() {
    if (this.empID === "") {
      this.messageService.updateMessages(new Message (["Faculty member not selected"], true));
    } else {
      this.postDataService.saveComments(this.commentToEdit)
        .subscribe(data => {
          if (data.errors) {
            this.messageService.updateMessages(new Message (data.errors, true));
          } else {
            this.globalComments = Object.assign({}, data);
            this.commentToEdit = this.commentDefault();
          }
      });
    }
  }

  print() {
    window.print();
  }

}

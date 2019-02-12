import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { GetDataService } from "../../services/get-data.service";
import { Course } from "../../classes/course";
import { PostDataService } from "../../services/post-data.service";
import { MessageService } from "../../services/message.service";
import { Message } from "../../classes/message";
import { Assignment } from "../../classes/assignment";

@Component({
  selector: "[add-row]",
  templateUrl: "./add-row.component.html",
  styleUrls: ["./add-row.component.css"]
})
export class AddRowComponent implements OnInit {

  chosenCourse = "";
  empID = "";
  newAssign: Assignment = this.clearAssign();
  courseList$: Observable<Course[]>;

  constructor(
    private getDataService: GetDataService,
    private postDataService: PostDataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.courseList$ = this.getDataService.getCourseList();
    this.getDataService.empID$.subscribe(id => this.empID = id);
    this.messageService.messages$.subscribe();
  }

  clearAssign() {
    return new Assignment("", null, this.empID, "", null, null, null, "", "", "");
  }

  courseChange(id) {
    this.newAssign.courseID = id;
  }

  addNewAssign() {
    if (this.empID === "") {
      this.messageService.updateMessages(new Message (["Faculty member not selected"], true));
    } else {
      this.newAssign.empID = this.empID;
      this.postDataService.addAssign(this.newAssign)
        .subscribe(assign => {
          if (assign.errors) {
            this.messageService.updateMessages(new Message (assign.errors, true));
          } else {
            this.getDataService.getCourseAssigns();
            this.resetValues();
          }
        });
    }
  }

  resetValues() {
    this.messageService.clearMessages();
    this.newAssign = this.clearAssign();
    this.chosenCourse = "";
    console.log(this.chosenCourse);
  }

}

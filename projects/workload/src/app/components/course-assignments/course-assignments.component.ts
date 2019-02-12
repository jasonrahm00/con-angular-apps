import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { GetDataService } from "../../services/get-data.service";
import { Assignment } from "../../classes/assignment";
import { PostDataService } from "../../services/post-data.service";
import { Course } from "../../classes/course";
import { MessageService } from "../../services/message.service";
import { Message } from "../../classes/message";

@Component({
  selector: "app-course-assignments",
  templateUrl: "./course-assignments.component.html",
  styleUrls: ["./course-assignments.component.css"]
})
export class CourseAssignmentsComponent implements OnInit {

  empID = "";
  courseAssigns: Assignment[] = [];
  courseList$: Observable<Course[]>;
  assignToEdit: Assignment = this.setDefaultEdit();
  assignIndex;

  constructor(
    private getDataService: GetDataService,
    private postDataService: PostDataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.getDataService.courseAssigns.subscribe(data => this.courseAssigns = data);
    this.getDataService.empID$.subscribe(id => this.empID = id);
    this.courseList$ = this.getDataService.getCourseList();
    this.messageService.messages$.subscribe();
  }

  deleteAssign(assign, index) {
    const confirmDelete = confirm("Are you sure you want to delete this entry?");
    if (confirmDelete) {
      this.postDataService.deleteAssign(this.empID, assign).subscribe(data => {
        if (!data.errors) {
          this.courseAssigns.splice(index, 1);
        } else {
          console.error(data.errors);
        }
      });
    }
  }

  setDefaultEdit() {
    return new Assignment("", null, this.empID, "", null, null, null, "", "", "", []);
  }

  editAssign(assign, index) {
    this.assignToEdit = Object.assign({}, assign);
    this.assignToEdit.empID = this.empID;
    this.assignIndex = index;
  }

  cancelAssignEdit() {
    this.assignToEdit = this.setDefaultEdit();
  }

  saveAssignEdit() {
    this.postDataService.saveAssignEdit(this.assignToEdit)
      .subscribe(data => {
        if (data.errors) {
          this.messageService.updateMessages(new Message (data.errors, true));
        } else {
          this.getDataService.getCourseAssigns();
          this.messageService.clearMessages();
          this.assignToEdit = this.setDefaultEdit();
        }
      }
    );
  }

}

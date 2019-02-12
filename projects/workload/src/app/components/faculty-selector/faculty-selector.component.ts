import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Faculty } from "../../classes/faculty";
import { GetDataService } from "../../services/get-data.service";
import { MessageService } from "../../services/message.service";
import { Message } from "../../classes/message";

@Component({
  selector: "app-faculty-selector",
  templateUrl: "./faculty-selector.component.html",
  styleUrls: ["./faculty-selector.component.css"]
})
export class FacultySelectorComponent implements OnInit {

  faculty$: Observable<Faculty[]>;
  messages$;

  chosenFaculty = "";

  constructor(
    private getDataService: GetDataService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.faculty$ = this.getDataService.getFacultyList();
    this.messageService.messages$.subscribe(messages => this.messages$ = messages);
  }

  onChangeObj(newObj): void {
    if (this.messages$.error) {
      this.messageService.clearMessages();
    }
    this.getDataService.getFacultyData(newObj.EmployeeID);
  }

}

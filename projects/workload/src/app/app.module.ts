import { BrowserModule, Title } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { FundingBreakdownComponent } from "./components/funding-breakdown/funding-breakdown.component";
import { CourseAssignmentsComponent } from "./components/course-assignments/course-assignments.component";
import { FacultySelectorComponent } from "./components/faculty-selector/faculty-selector.component";
import { GetDataService } from "./services/get-data.service";
import { AddRowComponent } from "./components/add-row/add-row.component";
import { PostDataService } from "./services/post-data.service";
import { MessageService } from "./services/message.service";
import { MessagesComponent } from "./components/messages/messages.component";
import { FteTableComponent } from "./components/fte-table/fte-table.component";

@NgModule({

  declarations: [
    AppComponent,
    FundingBreakdownComponent,
    CourseAssignmentsComponent,
    FacultySelectorComponent,
    AddRowComponent,
    MessagesComponent,
    FteTableComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    GetDataService,
    PostDataService,
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

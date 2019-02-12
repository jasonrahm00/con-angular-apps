import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { MessageService } from "../../services/message.service";
import { Message } from "../../classes/message";

@Component({
  selector: "app-messages",
  templateUrl: "./messages.component.html",
  styleUrls: ["./messages.component.css"]
})
export class MessagesComponent implements OnInit {

  messages$;

  constructor(private messageService: MessageService) { }

  ngOnInit() {
    this.messageService.messages$.subscribe(messages => this.messages$ = messages);
  }

}

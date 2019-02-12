import { Injectable } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";

import { Message } from "../classes/message";

const defaultMessage = new Message([""], false);

@Injectable()
export class MessageService {

  messages = new BehaviorSubject<Message>(defaultMessage);
  messages$ = this.messages.asObservable();

  constructor() { }

  clearMessages() {
    this.messages.next(defaultMessage);
  }

  updateMessages(messages: Message) {
    this.clearMessages();
    this.messages.next(messages);
  }

}

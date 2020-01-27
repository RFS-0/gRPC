import { Component, OnInit } from '@angular/core';
import {UserResponse} from "../../../protobuffers/chat_pb";
import {ChatClientServiceImpl} from "../../chat-client-service-impl.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserResponse;

  constructor(private chatServiceClient: ChatClientServiceImpl) { }

  ngOnInit() {
    this.user = this.chatServiceClient.getUser();
    console.log(this.user);
    this.chatServiceClient.onUserChanged().subscribe(newUser => this.user = newUser);
  }

}

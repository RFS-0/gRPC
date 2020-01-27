import {Component, OnInit} from '@angular/core';
import {UserResponse, UserResponseList} from "../../../protobuffers/chat_pb";
import {ChatClientServiceImpl} from "../../chat-client-service-impl.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: UserResponse[];
  displayedColumns: string[] = ['id', 'alias', 'name'];

  constructor(private chatClientService: ChatClientServiceImpl) {
  }

  ngOnInit() {
    this.chatClientService.onAllUsersChanged().subscribe(users => {
      this.users = users;
    });
    this.chatClientService.getAllUsers();
  }
}

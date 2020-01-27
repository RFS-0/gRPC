import {Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material";
import {ChatClientServiceImpl} from "../chat-client-service-impl.service";

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @ViewChild('sidenav', {static: false})
  sidenav: MatSidenav;

  userRegistered = false;

  constructor(private chatServiceClient: ChatClientServiceImpl) {
  }

  ngOnInit(): void {
    this.userRegistered = this.chatServiceClient.getUser() !== null;
    this.chatServiceClient.onUserChanged().subscribe(userResponse => {
      if (userResponse) {
        this.userRegistered = true;
      }
    })
  }

  toggle() {
    this.sidenav.toggle();
  }
}

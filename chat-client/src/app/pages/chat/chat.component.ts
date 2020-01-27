import {Component, OnInit} from '@angular/core';
import {MessageResponse, UserResponse} from "../../../protobuffers/chat_pb";
import {ChatClientServiceImpl} from "../../chat-client-service-impl.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  ChatBubbleType = ChatBubbleType;
  chatBubbles: ChatBubble[] = [
    {
      type: ChatBubbleType.USER_JOINED,
      message: 'You join the chat',
      from: 'Chat server'
    } as ChatBubble
  ];
  messageForm: FormGroup;

  private user: UserResponse;

  constructor(private chatServiceClient: ChatClientServiceImpl) {
  }

  ngOnInit() {
    this.user = this.chatServiceClient.getUser();
    this.chatServiceClient.onUserChanged().subscribe(newUser => {
      this.user = newUser;
    });
    this.chatServiceClient.onNeweUserRegistered().subscribe(newUser => {
        if (newUser) {
          this.chatBubbles.push({
            type: ChatBubbleType.USER_JOINED,
            message: 'User with alias "' + newUser.getAlias() + '" joined the chat',
            from: 'Chat server'
          } as ChatBubble);
        }
      }
    );
    this.chatServiceClient.users();
    this.chatServiceClient.onNewMessage().subscribe(newMessage => {
      if (newMessage) {
        this.chatBubbles.push({
          type: newMessage.getFrom().getId() === this.user.getId() ? ChatBubbleType.MESSAGE_SENT : ChatBubbleType.MESSAGE_RECEIVED,
          message: newMessage.getMessage(),
          from: newMessage.getFrom().getAlias()
        });
      }
    });
    this.chatServiceClient.messages();
    this.messageForm = new FormGroup({
      message: new FormControl(''),
    });
  }

  get message() {
    return this.messageForm.value.message;
  }

  sendMessage() {
    this.chatServiceClient.createMessage(this.message);
    this.messageForm.get('message').reset('');
  }
}

interface ChatBubble {
  type: ChatBubbleType;
  message?: string;
  from?: string
}

enum ChatBubbleType {
  USER_JOINED,
  MESSAGE_SENT,
  MESSAGE_RECEIVED
}

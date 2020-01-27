import {Injectable} from '@angular/core';
import {ChatServiceClient} from "../protobuffers/ChatServiceClientPb";
import {
  EmptyRequest,
  MessageRequest, MessageResponse,
  MessageResponseList,
  UserRequest,
  UserResponse,
  UserResponseList
} from "../protobuffers/chat_pb";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatClientServiceImpl {

  private chatServiceClient: ChatServiceClient;

  private user: UserResponse = null;
  private userChanged = new BehaviorSubject<UserResponse>(null);
  private allUsers: UserResponseList;
  private allUsersChanged = new BehaviorSubject<UserResponse[]>(null);
  private newUserRegistered = new BehaviorSubject<UserResponse>(null);

  private message: MessageResponse = null;
  private messageChanged = new BehaviorSubject<MessageResponse>(null);
  private allMessages: MessageResponseList;
  private allMessagesChanged = new BehaviorSubject<MessageResponse[]>(null)

  constructor() {
    this.chatServiceClient = new ChatServiceClient('http://localhost:8080', null, null);
  }

  createUser(alias: string, name: string, onSuccess?: () => void): void {
    let userRequest = new UserRequest();
    userRequest.setAlias(alias);
    userRequest.setName(name);
    this.chatServiceClient.createUser(
      userRequest,
      null,
      (responseError, userResponse) => {
        if (responseError) {
          console.log(`Could not create user due to the following error: ${responseError.message}`);
        } else {
          this.user = userResponse;
          this.userChanged.next(userResponse);
          onSuccess && onSuccess();
        }
      })
  }

  getUser(): UserResponse {
    return this.user;
  }

  onUserChanged(): Observable<UserResponse> {
    return this.userChanged.asObservable();
  }

  isUserRegistered(): boolean {
    return this.user !== null;
  }

  getAllUsers(onSuccess?: () => void): void {
    const empty = new EmptyRequest();
    this.chatServiceClient.getAllUsers(
      empty,
      null,
      (responseError, userResponseList) => {
        if (responseError) {
          console.log(`Could not get all users due to the following error: ${responseError.message}`);
        } else {
          console.log(`Got the following response for get all users: ${userResponseList}`);
          this.allUsers = userResponseList;
          this.allUsersChanged.next(userResponseList.getUsersList());
          onSuccess && onSuccess();
        }
      });
  }

  onAllUsersChanged(onSuccess?: () => void): Observable<UserResponse[]> {
    return this.allUsersChanged.asObservable();
  }

  users(): void {
    let emptyRequest = new EmptyRequest();
    console.log('Subscribing to steam of new users');
    this.chatServiceClient.users(emptyRequest, null).on("data", userResponse => {
      let newUser = userResponse as UserResponse;
      console.log('Client got notified about new user: ' + newUser);
      this.newUserRegistered.next(newUser);
    });
  }

  onNeweUserRegistered(): Observable<UserResponse> {
    return this.newUserRegistered.asObservable();
  }

  createMessage(message: string, onSuccess?: () => void) {
    let messageRequest = new MessageRequest();
    messageRequest.setFrom(this.user);
    messageRequest.setMessage(message);
    this.chatServiceClient.createMessage(
      messageRequest,
      null,
      (responseError, messageResponse) => {
        if (responseError) {
          console.log(`Could not create message due to the following error: ${responseError.message}`);
        } else {
          console.log(`Created message: ${messageResponse.getMessage()}`);
          onSuccess && onSuccess();
        }
      })
  }

  getAllMessages(onSuccess?: () => void) {
    const emptyRequest = new EmptyRequest();
    this.chatServiceClient.getAllMessages(
      emptyRequest,
      null,
      (responseError, messageResponseList) => {
        if (responseError) {
          console.log(`Could not get all messages due to the following error: ${responseError.message}`);
        } else {
          this.allMessages = messageResponseList;
          this.allMessagesChanged.next(messageResponseList.getMessagesList());
          onSuccess && onSuccess();
        }
      })
  }

  onAllMessagesChanged(): Observable<MessageResponse[]> {
    return this.allMessagesChanged.asObservable();
  }

  messages() {
    const emptyRequest = new EmptyRequest();
    this.chatServiceClient.messages(emptyRequest, null).on("data", messageResponse => {
      let newMessage = messageResponse as MessageResponse;
      console.log('Client got notified about new message: ' + newMessage);
      this.messageChanged.next(newMessage);
    });
    console.log('Subscribing to steam of new messages');
  }

  onNewMessage(): Observable<MessageResponse> {
    return this.messageChanged.asObservable();
  }
}

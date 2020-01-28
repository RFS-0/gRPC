/**
 * @fileoverview gRPC-Web generated client stub for chat
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


import * as grpcWeb from 'grpc-web';

import {
  EmptyRequest,
  MessageRequest,
  MessageResponse,
  MessageResponseList,
  UserRequest,
  UserResponse,
  UserResponseList} from './chat_pb';

export class ChatServiceClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: string; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: string; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'text';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodInfocreateUser = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponse,
    (request: UserRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  createUser(
    request: UserRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/chat.ChatService/createUser',
      request,
      metadata || {},
      this.methodInfocreateUser,
      callback);
  }

  methodInfogetAllUsers = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponseList,
    (request: EmptyRequest) => {
      return request.serializeBinary();
    },
    UserResponseList.deserializeBinary
  );

  getAllUsers(
    request: EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: UserResponseList) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/chat.ChatService/getAllUsers',
      request,
      metadata || {},
      this.methodInfogetAllUsers,
      callback);
  }

  methodInfousers = new grpcWeb.AbstractClientBase.MethodInfo(
    UserResponse,
    (request: EmptyRequest) => {
      return request.serializeBinary();
    },
    UserResponse.deserializeBinary
  );

  users(
    request: EmptyRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/chat.ChatService/users',
      request,
      metadata || {},
      this.methodInfousers);
  }

  methodInfocreateMessage = new grpcWeb.AbstractClientBase.MethodInfo(
    MessageResponse,
    (request: MessageRequest) => {
      return request.serializeBinary();
    },
    MessageResponse.deserializeBinary
  );

  createMessage(
    request: MessageRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MessageResponse) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/chat.ChatService/createMessage',
      request,
      metadata || {},
      this.methodInfocreateMessage,
      callback);
  }

  methodInfogetAllMessages = new grpcWeb.AbstractClientBase.MethodInfo(
    MessageResponseList,
    (request: EmptyRequest) => {
      return request.serializeBinary();
    },
    MessageResponseList.deserializeBinary
  );

  getAllMessages(
    request: EmptyRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.Error,
               response: MessageResponseList) => void) {
    return this.client_.rpcCall(
      this.hostname_ +
        '/chat.ChatService/getAllMessages',
      request,
      metadata || {},
      this.methodInfogetAllMessages,
      callback);
  }

  methodInfomessages = new grpcWeb.AbstractClientBase.MethodInfo(
    MessageResponse,
    (request: EmptyRequest) => {
      return request.serializeBinary();
    },
    MessageResponse.deserializeBinary
  );

  messages(
    request: EmptyRequest,
    metadata?: grpcWeb.Metadata) {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/chat.ChatService/messages',
      request,
      metadata || {},
      this.methodInfomessages);
  }

}


import * as jspb from "google-protobuf"

export class EmptyRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EmptyRequest.AsObject;
  static toObject(includeInstance: boolean, msg: EmptyRequest): EmptyRequest.AsObject;
  static serializeBinaryToWriter(message: EmptyRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EmptyRequest;
  static deserializeBinaryFromReader(message: EmptyRequest, reader: jspb.BinaryReader): EmptyRequest;
}

export namespace EmptyRequest {
  export type AsObject = {
  }
}

export class UserRequest extends jspb.Message {
  getName(): string;
  setName(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserRequest.AsObject;
  static toObject(includeInstance: boolean, msg: UserRequest): UserRequest.AsObject;
  static serializeBinaryToWriter(message: UserRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserRequest;
  static deserializeBinaryFromReader(message: UserRequest, reader: jspb.BinaryReader): UserRequest;
}

export namespace UserRequest {
  export type AsObject = {
    name: string,
    alias: string,
  }
}

export class UserResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getName(): string;
  setName(value: string): void;

  getAlias(): string;
  setAlias(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponse.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponse): UserResponse.AsObject;
  static serializeBinaryToWriter(message: UserResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponse;
  static deserializeBinaryFromReader(message: UserResponse, reader: jspb.BinaryReader): UserResponse;
}

export namespace UserResponse {
  export type AsObject = {
    id: string,
    name: string,
    alias: string,
  }
}

export class UserResponseList extends jspb.Message {
  getUsersList(): Array<UserResponse>;
  setUsersList(value: Array<UserResponse>): void;
  clearUsersList(): void;
  addUsers(value?: UserResponse, index?: number): UserResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UserResponseList.AsObject;
  static toObject(includeInstance: boolean, msg: UserResponseList): UserResponseList.AsObject;
  static serializeBinaryToWriter(message: UserResponseList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UserResponseList;
  static deserializeBinaryFromReader(message: UserResponseList, reader: jspb.BinaryReader): UserResponseList;
}

export namespace UserResponseList {
  export type AsObject = {
    usersList: Array<UserResponse.AsObject>,
  }
}

export class MessageRequest extends jspb.Message {
  getFrom(): UserResponse | undefined;
  setFrom(value?: UserResponse): void;
  hasFrom(): boolean;
  clearFrom(): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageRequest.AsObject;
  static toObject(includeInstance: boolean, msg: MessageRequest): MessageRequest.AsObject;
  static serializeBinaryToWriter(message: MessageRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageRequest;
  static deserializeBinaryFromReader(message: MessageRequest, reader: jspb.BinaryReader): MessageRequest;
}

export namespace MessageRequest {
  export type AsObject = {
    from?: UserResponse.AsObject,
    message: string,
  }
}

export class MessageResponse extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  getFrom(): UserResponse | undefined;
  setFrom(value?: UserResponse): void;
  hasFrom(): boolean;
  clearFrom(): void;

  getMessage(): string;
  setMessage(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageResponse.AsObject;
  static toObject(includeInstance: boolean, msg: MessageResponse): MessageResponse.AsObject;
  static serializeBinaryToWriter(message: MessageResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageResponse;
  static deserializeBinaryFromReader(message: MessageResponse, reader: jspb.BinaryReader): MessageResponse;
}

export namespace MessageResponse {
  export type AsObject = {
    id: string,
    from?: UserResponse.AsObject,
    message: string,
  }
}

export class MessageResponseList extends jspb.Message {
  getMessagesList(): Array<MessageResponse>;
  setMessagesList(value: Array<MessageResponse>): void;
  clearMessagesList(): void;
  addMessages(value?: MessageResponse, index?: number): MessageResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): MessageResponseList.AsObject;
  static toObject(includeInstance: boolean, msg: MessageResponseList): MessageResponseList.AsObject;
  static serializeBinaryToWriter(message: MessageResponseList, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): MessageResponseList;
  static deserializeBinaryFromReader(message: MessageResponseList, reader: jspb.BinaryReader): MessageResponseList;
}

export namespace MessageResponseList {
  export type AsObject = {
    messagesList: Array<MessageResponse.AsObject>,
  }
}


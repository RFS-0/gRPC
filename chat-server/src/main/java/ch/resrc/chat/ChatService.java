package ch.resrc.chat;

import io.grpc.stub.ServerCallStreamObserver;
import io.grpc.stub.StreamObserver;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

public class ChatService extends ChatServiceGrpc.ChatServiceImplBase {

    private UserResponse.Builder userBuilder = UserResponse.newBuilder();
    private UserResponseList.Builder userResponseListBuilder = UserResponseList.newBuilder();
    private List<ServerCallStreamObserver<UserResponse>> userResponseObservers = new ArrayList<>();

    private MessageResponse.Builder messageResponseBuilder = MessageResponse.newBuilder();
    private MessageResponseList.Builder messageResponseListBuilder = MessageResponseList.newBuilder();
    private List<ServerCallStreamObserver<MessageResponse>> messageResponseObservers = new ArrayList<>();

    @Override
    public void createUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        System.out.println("*** Service is creating a new user with name '" + request.getName() + "' ***");
        UserResponse userResponse = userBuilder
                .setId(UUID.randomUUID().toString())
                .setAlias(request.getAlias())
                .setName(request.getName())
                .build();
        userResponseListBuilder.addUsers(userResponse);
        responseObserver.onNext(userResponse);
        responseObserver.onCompleted();
        notifyClientsOfNewUser(userResponse);
    }

    @Override
    public void getAllUsers(EmptyRequest request, StreamObserver<UserResponseList> responseObserver) {
        responseObserver.onNext(userResponseListBuilder.build());
        System.out.println("*** Service returned all existing users to client ***");
        responseObserver.onCompleted();
    }

    @Override
    public void users(EmptyRequest request, StreamObserver<UserResponse> responseObserver) {
        System.out.println("*** Service registered a new client to be notified of new users ***");
        if (responseObserver instanceof ServerCallStreamObserver) {
            this.userResponseObservers.add((ServerCallStreamObserver<UserResponse>) responseObserver);
        }
    }

    private void notifyClientsOfNewUser(UserResponse newUser) {
        if (this.userResponseObservers.size() > 0) {
            removeCancelledUserObservers();
            userResponseObservers.forEach(observer -> observer.onNext(newUser));
            System.out.println(" *** Service notified all clients about new user with name '" + newUser.getName() + "' ***");
        } else {
            System.out.println("*** Service has no clients to notify about new user ***");
        }
    }

    private void removeCancelledUserObservers() {
        List<ServerCallStreamObserver<UserResponse>> cancelled = userResponseObservers.stream()
                .filter(observer -> observer.isCancelled())
                .collect(Collectors.toList());
        userResponseObservers.removeAll(cancelled);
    }

    @Override
    public void createMessage(MessageRequest request, StreamObserver<MessageResponse> responseObserver) {
        System.out.println("*** Service is creating a new message from user '" + request.getFrom() + "' with content '" + request.getMessage() + "' ***");
        MessageResponse messageResponse = messageResponseBuilder
                .setId(UUID.randomUUID().toString())
                .setFrom(request.getFrom())
                .setMessage(request.getMessage())
                .build();
        messageResponseListBuilder.addMessages(messageResponse);
        responseObserver.onNext(messageResponse);
        responseObserver.onCompleted();
        notifyClientsOfNewMessage(messageResponse);
    }

    @Override
    public void getAllMessages(EmptyRequest request, StreamObserver<MessageResponseList> responseObserver) {
        responseObserver.onNext(messageResponseListBuilder.build());
        System.out.println("*** Service returned all existing messages to client ***");
        responseObserver.onCompleted();
    }

    @Override
    public void messages(EmptyRequest request, StreamObserver<MessageResponse> responseObserver) {
        System.out.println("*** Service registered a new client to be notified of new messages ***");
        if (responseObserver instanceof ServerCallStreamObserver) {
            this.messageResponseObservers.add((ServerCallStreamObserver<MessageResponse>) responseObserver);
        }
    }

    private void notifyClientsOfNewMessage(MessageResponse messageResponse) {
        if (this.messageResponseObservers.size() > 0) {
            removeCancelledMessageResponseObservers();
            messageResponseObservers.forEach(observer -> observer.onNext(messageResponse));
            System.out.println(" *** Service notified all clients about new message from '" + messageResponse.getFrom().getAlias() + "' with content '" + messageResponse.getMessage() + "' ***");
        } else {
            System.out.println("*** Service has no clients to notify about new user ***");
        }
    }

    private void removeCancelledMessageResponseObservers() {
        List<ServerCallStreamObserver<MessageResponse>> cancelled = messageResponseObservers.stream()
                .filter(observer -> observer.isCancelled())
                .collect(Collectors.toList());
        System.out.println("*** Removing the following number of observers: " + cancelled.size() + " ***");
        messageResponseObservers.removeAll(cancelled);
    }
}

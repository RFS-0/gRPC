package ch.resrc.chat;

import io.grpc.stub.StreamObserver;

import java.util.UUID;

public class ChatService extends ChatServiceGrpc.ChatServiceImplBase {

    private UserResponse.Builder userBuilder = UserResponse.newBuilder();
    private UserResponseList.Builder userResponseListBuilder = UserResponseList.newBuilder();
    private StreamObserver<UserResponse> responseObserver;

    @Override
    public void createUser(UserRequest request, StreamObserver<UserResponse> responseObserver) {
        System.out.println("*** Service is creating a new user wit name '" + request.getName() + "' ***");
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
        this.responseObserver = responseObserver;
    }

    private void notifyClientsOfNewUser(UserResponse newUser) {
        if (this.responseObserver != null) {
            this.responseObserver.onNext(newUser);
            System.out.println(" *** Service notified all clients about new user with name '" + newUser.getName() + "' ***");
        } else {
            System.out.println("*** Service has no clients to notify about new user ***");
        }
    }
}

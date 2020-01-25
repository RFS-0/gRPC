package ch.resrc.chat;

import io.grpc.Channel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.ClientCallStreamObserver;
import io.grpc.stub.ClientResponseObserver;

import java.util.logging.Level;
import java.util.logging.Logger;

public class ChatClient {

    private Logger logger = Logger.getLogger("ChatClientLogger");
    private Channel channel;
    private ChatServiceGrpc.ChatServiceBlockingStub blockingStub;
    private ChatServiceGrpc.ChatServiceStub asyncStub;

    private UserRequest.Builder userBuilder = UserRequest.newBuilder();

    public ChatClient(ManagedChannelBuilder<?> channelBuilder) {
        channel = channelBuilder.build();
        blockingStub = ChatServiceGrpc.newBlockingStub(channel);
        asyncStub = ChatServiceGrpc.newStub(channel);
    }

    public ChatClient(int port) {
        this(
                ManagedChannelBuilder.forAddress("localhost", port).usePlaintext().usePlaintext()
        );
    }

    public UserRequest.Builder getUserBuilder() {
        return userBuilder;
    }

    public void createUser(UserRequest userRequest) {
        System.out.println("*** Client is creating a new user with name '" + userRequest.getName() + "'");
        UserResponse createdUser = blockingStub.createUser(userRequest);
        System.out.println("*** A new user with name '" + createdUser.getName() + "' and Id '" + createdUser.getId() + "' was created.");
    }

    public void getAllUsers() {
        System.out.println("*** Client is getting all users ***");
        UserResponseList allUsers = blockingStub.getAllUsers(EmptyRequest.newBuilder().build());
        System.out.println("*** Client got the following users (all) ***");
        allUsers.getUsersList().forEach(userResponse -> System.out.println(userResponse.getName()));
    }

    public void users() {
        System.out.println("*** Client starts listening for new users ***");
        asyncStub.users(EmptyRequest.newBuilder().build(), new ClientResponseObserver<UserRequest, UserResponse>() {
            @Override
            public void beforeStart(ClientCallStreamObserver requestStream) {
                // nop
            }

            @Override
            public void onNext(UserResponse userResponse) {
                System.out.println("*** Client got notified of new user with name '" + userResponse.getName() + "'");
            }

            @Override
            public void onError(Throwable t) {
                logger.log(Level.WARNING, "Encountered error in users", t);
            }

            @Override
            public void onCompleted() {
                // will not happen because we never call on complete in the service implementation
                System.out.println("*** Client got notified that users stream is complete");
            }
        });
        System.out.println("*** Client is now listening for new users ***");
    }

    public static void main(String[] args) {
        System.out.println("Starting the client...");

        ChatClient client = new ChatClient(9090);

        client.createUser(
                client.getUserBuilder()
                        .setAlias("rabbit")
                        .setName("Thyra")
                        .build()
        );

        client.users();

        client.createUser(
                client.getUserBuilder()
                        .setAlias("fox")
                        .setName("Mathilde")
                        .build()
        );
        client.createUser(
                client.getUserBuilder()
                        .setAlias("snake")
                        .setName("Gary")
                        .build()
        );
        client.getAllUsers();

        System.out.println("Shutting the client down...");
    }
}

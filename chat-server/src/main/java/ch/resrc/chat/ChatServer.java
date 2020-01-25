package ch.resrc.chat;

import io.grpc.Server;
import io.grpc.ServerBuilder;

import java.io.IOException;

public class ChatServer {

    private Server server;

    public ChatServer(int port) {
        server = ServerBuilder.forPort(port)
                .addService(new ChatService())
                .build();
    }

    public void start() throws IOException {
        server.start();
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            System.err.println("*** Shutting down gRPC server since JVM is shutting down ***");
            ChatServer.this.stop();
            System.err.println("*** Server shut down *** ");
        }));
    }

    public void stop() {
        System.out.println("Stopping message server...");
        if (server != null) {
            server.shutdown();
        }
    }

    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    public static void main(String[] args) {
        ChatServer server = new ChatServer(9090);
        System.out.println("*** Starting chat server ***");
        try {
            server.start();
            System.out.println("*** Started chat server on port: " + server.getPort() + " ***");
            server.blockUntilShutdown();
        } catch (IOException | InterruptedException e) {
            System.out.println(e.toString());
        } finally {
            server.stop();
        }
    }

    private int getPort() {
        return server.getPort();
    }
}

# How to compile .proto files to TypeScript client
1. cd to directory containing the .proto file
2. execute:
```shell
protoc chat.proto \
--js_out=import_style=commonjs,binary:/Users/resc/git/gRPC/chat-client/src/protobuffers \
--grpc-web_out=import_style=typescript,mode=grpcwebtext:/Users/resc/git/gRPC/chat-client/src/protobuffers
```

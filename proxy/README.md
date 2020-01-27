# Build docker image for envoy proxy

Change to the directory containing the `Dockerfile` for envoy (i.e. this directory).

## Build image by executing:

`docker build -t grpcweb/envoy -f envoy.Dockerfile .`

## Run docker image by executing:

`docker run -p 8080:8080 grpcweb/envoy`
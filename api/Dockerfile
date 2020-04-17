FROM golang:1.14-alpine

LABEL maintainer="varkadov@theless.ru"

# Install modules
WORKDIR /go/src/app

COPY go.mod go.sum ./

RUN go get -d -v ./...
RUN go install -v ./...

# Build stage
COPY . .

CMD if [ "$ENV" = "development" ]; then \
        cd $(mktemp -d); \
        go mod init tmp; \
        go get -v github.com/cespare/reflex; \
        cd -; \
        reflex -r '(\.go$|go\.mod)' -s go run .; \
    else \
        go build -o main .; \
        ./main; \
    fi

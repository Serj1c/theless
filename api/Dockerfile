FROM golang:1.14.1-alpine3.11 as build

LABEL maintainer="varkadov@theless.ru"

WORKDIR /go/src/app
COPY . .

RUN go get -d -v ./...
RUN go install -v ./...

RUN go build -o main .

CMD ["./main"]

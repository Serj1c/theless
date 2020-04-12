package main

import (
	"fmt"
	"net/http"
)

func main() {
	http.HandleFunc("/", homePageHandler)

	http.ListenAndServe(":3000", nil)
}

func homePageHandler(writer http.ResponseWriter, request *http.Request) {
	fmt.Fprintf(writer, "API call \"" + request.URL.Path + "\"")
}

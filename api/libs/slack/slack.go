package slack

import (
	"bytes"
	"encoding/json"
	"net/http"
)

const url = "https://hooks.slack.com/services/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"
const contentType = "application/json"

type Body struct {
	Text string `json:"text"`
}

func SendMessage(message string) {
	go func() {
		b := &Body{Text: message}

		strBody, _ := json.Marshal(b)

		// TODO Log this stuff
		res, _ := http.Post(url, contentType, bytes.NewReader(strBody))
		defer res.Body.Close()
	}()
}

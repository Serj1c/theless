package events

import (
	"encoding/json"
	"fmt"
	"github.com/globalsign/mgo/bson"
	"github.com/varkadov/theless/api/config"
	"github.com/varkadov/theless/api/libs/slack"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"os"
	"time"
)

type subscribePayload struct {
	Email   string `json:"email" validate:"required,email"`
	EventID string `json:"eventId" validate:"-"`
}

type Doc struct {
	Email   string    `bson:"email"`
	Type    string    `bson:"type"`
	EventId string    `bson:"eventId,omitempty"`
	Date    time.Time `bson:"date"`
}

func (router *Router) subscribe(w http.ResponseWriter, r *http.Request) {
	payload := subscribePayload{}

	err := json.NewDecoder(r.Body).Decode(&payload)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	validate = validator.New()

	err = validate.Struct(payload)

	if err != nil {
		if _, ok := err.(*validator.InvalidValidationError); ok {
			http.Error(w, err.Error(), http.StatusBadRequest)
			return
		}

		// TODO Make good
		msg := map[string]map[string]string{
			"Email": {
				"email":    "Введите корректный email",
				"required": "Введите email",
			},
		}

		fieldMap := map[string]string{
			"Email": "email",
		}

		data := map[string]string{}

		for _, err := range err.(validator.ValidationErrors) {
			if field, ok := fieldMap[err.Field()]; ok {
				data[field] = msg[err.Field()][err.Tag()]
			}
		}

		s, err := json.Marshal(data)

		fmt.Println(s)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		w.WriteHeader(http.StatusBadRequest)
		_, _ = fmt.Fprintf(w, "%s", s)
		return
	}

	email := payload.Email
	eventId := payload.EventID

	doc := &Doc{
		Email: email,
		Type:  "events",
		Date:  time.Now(),
	}

	if bson.IsObjectIdHex(eventId) {
		doc.EventId = eventId
	}

	err = config.SubscriptionsCollection.Insert(doc)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	if os.Getenv("ENV") != "development" {
		// Sending log to the Slack
		slack.SendMessage("New subscription: " + email)
	}
}

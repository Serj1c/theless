package events

import (
	"github.com/gorilla/rpc/v2/json2"
	"github.com/varkadov/theless/api/config"
	"github.com/varkadov/theless/api/libs/slack"
	"gopkg.in/go-playground/validator.v9"
	"gopkg.in/mgo.v2/bson"
	"net/http"
	"time"
)

var validate *validator.Validate

type SubscribeV1Params struct {
	Email   string `json:"email" validate:"required,email"`
	EventID string `json:"eventId" validate:"-"`
}

type Reply struct {}

type Doc struct {
	Email   string    `bson:"email"`
	Type    string    `bson:"type"`
	EventId string    `bson:"eventId,omitempty"`
	Date    time.Time `bson:"date"`
}

func (e *EventService) SubscribeV1(r *http.Request, params *SubscribeV1Params, reply *Reply) error {
	validate = validator.New()

	err := validate.Struct(params)

	if err != nil {
		if _, ok := err.(*validator.InvalidValidationError); ok {
			return err
		}

		// TODO Make good
		msg := map[string]map[string]string{
			"Email": {
				"email": "Введите корректный email",
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

		return &json2.Error{
			Code: json2.E_BAD_PARAMS,
			Message: "Bad request",
			Data: data,
		}
	}

	email := params.Email
	eventId := params.EventID

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
		return err
	}

	// Sending log to the Slack
	slack.SendMessage("New subscription: " + email)

	return nil
}

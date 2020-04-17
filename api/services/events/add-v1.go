package events

import (
	"github.com/gorilla/rpc/v2/json2"
	"github.com/varkadov/theless/api/config"
	"github.com/varkadov/theless/api/libs/slack"
	"gopkg.in/go-playground/validator.v9"
	"net/http"
	"strings"
	"time"
)

type AddV1Params struct {
	Name        string    `json:"name" bson:"name" validate:"required"`
	Date        string    `json:"date" bson:"date" validate:"required"`
	Address     string    `json:"address" bson:"address" validate:"required"`
	Contacts    string    `json:"contacts" bson:"contacts" validate:"required"`
	Description string    `json:"description" bson:"description" validate:"required"`
	Notes       string    `json:"notes" bson:"note"`
	Added       time.Time `bson:"added"`
}

type AddV1Reply struct{}

func (e *EventService) AddV1(r *http.Request, params *AddV1Params, reply *AddV1Reply) error {
	validate = validator.New()

	err := validate.Struct(params)

	if err != nil {
		// Common validation error
		if _, ok := err.(*validator.InvalidValidationError); ok {
			return err
		}

		// Fields validation error
		data := map[string]string{}

		for _, err := range err.(validator.ValidationErrors) {
			data[strings.ToLower(err.Field())] = errorMessages[err.Field()][err.Tag()]
		}

		return &json2.Error{
			Code:    json2.E_BAD_PARAMS,
			Message: "Bad request",
			Data:    data,
		}
	}

	// Save to the DB
	params.Added = time.Now()

	err = config.NewEventCollection.Insert(params)

	if err != nil {
		return err
	}

	// Send notification to the Slack
	slack.SendMessage("New event added \"" + params.Name + "\"")

	return nil
}

var errorMessages = map[string]map[string]string{
	"Name": {
		"required": "Введите название события",
	},
	"Date": {
		"required": "Введите дату события",
	},
	"Address": {
		"required": "Введите адрес проведения события",
	},
	"Contacts": {
		"required": "Введите контакты ответственного лица",
	},
	"Description": {
		"required": "Введите краткое описание события",
	},
}

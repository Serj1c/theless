package favorites

import (
	"bytes"
	"encoding/json"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func Test_Add(t *testing.T) {
	body := &addPayload{
		Action: "add",
		Type:   "event",
		Id:     "123",
	}

	// TODO Check out implementation
	requestBody, _ := json.Marshal(body)
	requestReader := bytes.NewReader(requestBody)
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/", requestReader)
	handler := http.HandlerFunc(add)

	handler.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)
	// TODO Check out implementation
	assert.Equal(t, "{\"isFavorite\":true}", rec.Body.String())
}

func Test_Remove(t *testing.T) {
	body := &addPayload{
		Action: "remove",
		Type:   "event",
		Id:     "123",
	}

	// TODO Check out implementation
	requestBody, _ := json.Marshal(body)
	requestReader := bytes.NewReader(requestBody)
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/", requestReader)
	handler := http.HandlerFunc(add)

	handler.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusOK, rec.Code)
	// TODO Check out implementation
	assert.Equal(t, "{\"isFavorite\":false}", rec.Body.String())
}

func Test_Invalid_JSON(t *testing.T) {
	// TODO Check out implementation
	requestBody, _ := json.Marshal("some invalid JSON")
	requestReader := bytes.NewReader(requestBody)
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodPost, "/", requestReader)
	handler := http.HandlerFunc(add)

	handler.ServeHTTP(rec, req)

	assert.Equal(t, http.StatusBadRequest, rec.Code)
}

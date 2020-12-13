package favorites

import (
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"testing"
)

func Test_GetList(t *testing.T) {
	rec := httptest.NewRecorder()
	req := httptest.NewRequest(http.MethodGet, "/", nil)
	handler := http.HandlerFunc(getList)

	handler.ServeHTTP(rec, req)

	assert.Equal(t, rec.Body.String(), "get list endpoint")
}

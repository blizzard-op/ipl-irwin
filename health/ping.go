package health

import (
	"fmt"
	"net/http"
)

func Ping(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-type", "text/plain")
	w.Header().Set("Connection", "close")
	w.Header().Set("Cache-Control", "must-revalidate, no-cache, no-store")
	fmt.Fprint(w, "pong")
}

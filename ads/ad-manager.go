package ads

import (
	"github.com/gorilla/mux"
	"net/http"
)

var adProviders = make(map[string]func(string) AdProvider)

type AdProvider interface {
	RunAd()
}

func AdRequester(w http.ResponseWriter, r *http.Request) {
	routeVars := mux.Vars(r)
	if provider, exists := adProviders[routeVars["service"]]; exists {
		provider(routeVars["stream"]).RunAd()
	}
	w.WriteHeader(201)
}

func RegisterProvider(name string, gen func(string) AdProvider) {
	adProviders[name] = gen
}

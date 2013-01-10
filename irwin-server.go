package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/ign/ipl-irwin/ads"
	"github.com/ign/ipl-irwin/health"
	"log"
	"net/http"
)

const (
	V1_PREFIX = "/irwin/v1"
)

func main() {

	var port int
	flag.IntVar(&port, "port", 80, "Default port is 80")
	flag.Parse()

	// Routes to serve front-end assets
	r := mux.NewRouter()
	http.Handle("/javascripts/", http.StripPrefix("/javascripts/", http.FileServer(http.Dir("frontend/public/javascripts/"))))
	http.Handle("/images/", http.StripPrefix("/images/", http.FileServer(http.Dir("frontend/public/images/"))))
	http.Handle("/stylesheets/", http.StripPrefix("/stylesheets/", http.FileServer(http.Dir("frontend/public/stylesheets/"))))

	// API Endpoints
	r.PathPrefix(V1_PREFIX + "/run-ad-on/{service}/for/{stream}").HandlerFunc(ads.AdRequester)
	r.Path(V1_PREFIX + "/ping").HandlerFunc(health.Ping)

	// Pass to front-end
	r.PathPrefix(V1_PREFIX + "/stream").HandlerFunc(index)
	r.PathPrefix(V1_PREFIX).HandlerFunc(index)

	http.Handle("/", r)
	fmt.Println("IRWIn Server starting")
	if err := http.ListenAndServe(":"+string(port), nil); err != nil {
		log.Fatalf("Could not start on port "+string(port), err)
	}
}

func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "frontend/public/index.html")
}

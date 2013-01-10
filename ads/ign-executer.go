package ads

import (
	"log"
	"net/http"
	"strings"
)

func (this *IgnRequest) RunAd() {
	if !debugMode {
		http.Post(this.Url+"?streamid="+this.StreamId+"&cue-point-type="+this.CuePointType, "text/plain", strings.NewReader(""))
	}
	log.Println("Fired an IGN ad")
}

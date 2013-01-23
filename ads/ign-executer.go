package ads

import (
	"log"
	"net/http"
	"strings"
)

func (this *IgnRequest) RunAd() {
	if debugMode {
		this.CuePointType = "inert"
	}
	resp, err := http.Post(this.Url+"?streamid="+this.StreamId+"&cue-point-type="+this.CuePointType, "text/plain", strings.NewReader(""))
	if err != nil {
		log.Println("Error posting to Ign stream " + this.StreamId + " status: " + err.Error())
		return
	}
	resp.Body.Close()
	log.Println("Fired an IGN ad on " + this.StreamId)
}

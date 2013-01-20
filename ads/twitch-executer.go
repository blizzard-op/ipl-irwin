package ads

import (
	"log"
	"net/http"
	"strings"
)

func (this *TwitchRequest) RunAd() {
	if debugMode {
		this.Channel = "ipldev"
	}
	resp, err := http.Post(this.Url+this.Channel+"/commercial?oauth_token="+this.OAuth, "application/json", strings.NewReader(``))
	if err != nil {
		log.Println("Error posting to Twitch, status: " + err.Error())
		return
	}

	resp.Body.Close()
	log.Println("Fired a Twitch Ad")
}

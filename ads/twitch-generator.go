package ads

import (
	"github.com/ign/ipl-irwin/configreader"
	"log"
)

func init() {
	RegisterProvider("twitch", newTwitch)
}

func newTwitch(channel string) AdProvider {
	var req TwitchRequest
	err := configreader.UnmarshalConfig("resources/twitch-ad-config.json", &req)
	if err != nil {
		log.Println("Error with creating Twitch Ad")
	}
	req.Channel = channel
	return &req
}

package ads

import (
	"github.com/ign/ipl-irwin/configreader"
	"log"
)

func init() {
	RegisterProvider("ign", newIgn)
}

func newIgn(streamId string) AdProvider {
	var req IgnRequest
	err := configreader.UnmarshalConfig("resources/ign-ad-config.json", &req)
	if err != nil {
		log.Println("Error with creating Ign Ad")
	}
	req.StreamId = streamId
	return &req
}

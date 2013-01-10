package configreader

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

func UnmarshalConfig(filePath string, container interface{}) error {
	if bytes, err := ioutil.ReadFile(filePath); err == nil {
		json.Unmarshal(bytes, container)
	} else {
		log.Println("Error unmarshaling config")
		return err
	}
	return nil
}

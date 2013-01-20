package configreader

import (
	"encoding/json"
	"io/ioutil"
	"log"
)

var configCache = make(map[string][]byte)

func UnmarshalConfig(filePath string, container interface{}) error {
	var bytes []byte
	if val, exists := configCache[filePath]; exists {
		log.Println("Reading config from cache")
		bytes = val
	} else {
		log.Println("Reading config from file")
		fileBytes, err := ioutil.ReadFile(filePath)
		if err != nil {
			log.Println("Error unmarshaling config")
			return err
		}
		configCache[filePath] = fileBytes
		bytes = fileBytes
	}
	json.Unmarshal(bytes, container)
	return nil
}

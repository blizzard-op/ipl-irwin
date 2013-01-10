Model = require 'models/base/model'

module.exports = class StreamsLoader extends Model
	initialize: ()->
		$.ajax 
			url: "http://esports.ign.com/content/v1/streams.json"
			dataType: 'jsonp'
			cached: true
			jsonpCallback: 'getCachedStreams'
			success: (data)=>
				@set 'streamsLoaded', data
			error: (er)=>
				console.log "Error loading streams"
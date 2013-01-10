module.exports = class StreamFinder
	@find: (query, streams)=>
		query = if query['streamid']? then query else {streamid:"sc21"}
		for stream in streams.models
			if query.streamid is stream.getStrippedName()
				return stream
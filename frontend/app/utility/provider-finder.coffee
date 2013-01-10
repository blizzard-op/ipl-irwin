module.exports = class ProviderFinder
	@find: (query, stream)=>
		for provider in stream.get 'providers'
			if provider.name is query
				return provider
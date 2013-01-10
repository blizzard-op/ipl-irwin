AdProvider = require 'models/ads/ad-provider'
ProviderFinder = require 'utility/provider-finder'

module.exports = class TwitchAdProvider extends AdProvider
	initialize: ()=>
		super
		@set 'provider', ProviderFinder.find('twitch', @get 'stream')
	runAd: =>
		$.ajax
			url: '/irwin/v1/run-ad-on/twitch/for/' + @getId()
			type: 'POST'
		console.log 'twitch request made'
		super
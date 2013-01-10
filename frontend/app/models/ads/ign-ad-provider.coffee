AdProvider = require 'models/ads/ad-provider'
ProviderFinder = require 'utility/provider-finder'

module.exports = class IgnAdProvider extends AdProvider
	initialize: ()=>
		super
		@set 'provider', ProviderFinder.find('ign', @get 'stream')
	runAd: =>
		# $.ajax
		# 	url: 'http://test.ign.com:9406/irwin/v1/run-ad-on/ign/for/' + @getId()
		# 	type: 'POST'
		console.log "ran IGN ad"
		super
	getId:=>
		@get('stream').get 'id'
Model = require 'models/base/model'
AdTimer = require 'utility/ad-timer'
TwitchAdProvider = require 'models/ads/twitch-ad-provider'
IgnAdProvider = require 'models/ads/ign-ad-provider'

module.exports = class AdManager extends Model
	defaults:
		stream: null
		autoPlayAds: false
		adProviders: []
		adDelay: 35
	initialize: ->
		super
		adProviders = [
			new TwitchAdProvider({stream: @get 'stream'}),
			new IgnAdProvider({stream: @get 'stream'})]
		@set 'adProviders', adProviders

	runAds: =>
		for provider in @get('adProviders')
			provider.runAd()
		if Boolean(@get 'autoPlayAds') is true
			AdTimer.start
				time: @get 'adDelay'
				complete: @runAds
				update: @nextAdTime

	startAds: =>
		@set 'autoPlayAds', true
		@runAds()

	stopAds: =>
		@set 'autoPlayAds', false
		AdTimer.stop()

	nextAdTime: =>
		@set 'timeLeft', AdTimer.timeLeft
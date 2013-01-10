template = require 'views/templates/home'
View = require 'views/base/view'
TwitchVideoPlayerView = require 'views/video/twitch-video-player-view'
IgnVideoPlayerView = require 'views/video/ign-video-player-view'
ProviderFinder = require 'utility/provider-finder'
ControlsView = require 'views/controls-view'

module.exports = class HomePageView extends View
	autoRender: true
	className: 'home-page'
	container: '#page-container'
	template: template

	initialize: ->
		super
		@videoProviders = [
			new TwitchVideoPlayerView({model: @model.get 'stream'}), 
			new IgnVideoPlayerView({model: @model.get 'stream'})]
		#set up controls
		@controls = new ControlsView({model: @model})

	render: ->
		super
		for a in @videoProviders
			a.$el.appendTo @$el.find("#video-container")
		@
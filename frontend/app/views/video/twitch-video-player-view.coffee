View = require 'views/base/view'
template = require 'views/templates/video/twitch-video-player'
ProviderFinder = require 'utility/provider-finder'

module.exports = class TwitchVideoPlayerView extends View
	autoRender: true
	template: template
	className: 'video-player'
	container: '#video'
	initialize:()->
		super
		@streamId = ProviderFinder.find('twitch', @model).id
		
	render: =>
		super
		@$el.html template({ streamId: @streamId })
		@
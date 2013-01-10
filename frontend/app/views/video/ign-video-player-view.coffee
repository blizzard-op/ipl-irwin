View = require 'views/base/view'
template = require 'views/templates/video/ign-video-player'

module.exports = class IgnVideoPlayerView extends View
	autoRender: true
	template: template
	className: 'video-player'
	container: '#video'
	initialize:->
		super
		@streamId = @model.get 'id'

	render: =>
		super
		@$el.html template({ streamId: @streamId })
		@
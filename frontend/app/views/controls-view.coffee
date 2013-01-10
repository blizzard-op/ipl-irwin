View = require 'views/base/view'
template = require 'views/templates/controls'
AdTimer = require 'utility/ad-timer'

module.exports = class ControlsView extends View
	template: template
	autoRender: true
	className: 'ad-controls'
	container: '#control-container'

	events:
		'click #play-ads-btn' : 'pressPlay'
		'click #stop-ads-btn' : 'pressStop'
		
	initialize: ->
		super
		@model.on('change:autoPlayAds', @changeStatus)
		@model.on('change:timeLeft', @updateTimer)
		
	render:->
		super
		@$el.find('#stop-ads-btn').hide()
		@$el.find('#ad-timer').hide()
		@

	pressPlay: =>
		@$el.find('#play-ads-btn').hide()
		@$el.find('#stop-ads-btn').show()
		@$el.find('#ad-timer').show()
		@model.startAds()

	pressStop: =>
		@$el.find('#stop-ads-btn').hide()
		@$el.find('#play-ads-btn').show()
		@$el.find('#ad-timer').hide()
		@model.stopAds()

	changeStatus: =>
		as = @$el.find('#ad-status')
		as.html "Are ads running? " + if @model.get 'autoPlayAds' then '<span class="yes-ads">Yes!</span>' else '<span class="no-ads">NO</span>'
		
	updateTimer: =>
		@$el.find('#ad-timer').text " Time to next ad: " + (AdTimer.timeLeft/1000).toFixed 2
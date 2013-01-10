module.exports = class AdTimer
	@start: (options) =>
		if @curTimer?
			window.clearTimeout @curTimer
			window.clearInterval @curInterval
		@updateFunc = options.update
		@timeLeft = options.time * 1000
		@curTimer = window.setTimeout options.complete, options.time * 1000
		@curInterval = window.setInterval @update, 1000 / 30
	@stop: =>
		window.clearTimeout @curTimer
		window.clearInterval @curInterval
	@update: =>
		@timeLeft -= 1000 / 30
		# console.log (@timeLeft / 1000).toFixed 2
		if @updateFunc?
			@updateFunc()
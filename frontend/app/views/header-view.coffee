View = require 'views/base/view'
template = require 'views/templates/header'

module.exports = class HeaderView extends View
	autoRender: yes
	className: 'header'
	container: '#header-container'
	id: 'header'
	template: template
	initialize: ->
		super
		@activeStreams = []
		if @collection?.length>0
			for i in [0...@collection.length]
				@activeStreams.push
					label: @collection.at(i).getName()
					link:@collection.at(i).getStrippedName()
	render: ->
		super
		@$el.html template({activeStreams: @activeStreams})
		@
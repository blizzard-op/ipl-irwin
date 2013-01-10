Controller = require 'controllers/base/controller'
HeaderView = require 'views/header-view'

module.exports = class HeaderController extends Controller
	initialize: (streams)->
		super
		@view = new HeaderView({collection:streams})


Controller = require 'controllers/base/controller'
HeaderController = require 'controllers/header-controller'
HomePageView = require 'views/home-page-view'
ControlView = require 'views/controls-view'
Streams = require 'models/streams'
StreamsLoader = require 'models/streams-loader'
StreamFinder = require 'utility/stream-finder'
ProviderFinder = require 'utility/provider-finder'
AdManager = require 'models/ad-manager'

module.exports = class HomeController extends Controller
	historyURL: 'home'
	title: 'Home'
	index:(route)->
		@streamsLoader = new StreamsLoader()
		@streamsLoader.on 'change:streamsLoaded', (loader)=>
			@streams = new Streams(loader.get 'streamsLoaded')
			@header = new HeaderController(@streams)
			
			@targetStream = StreamFinder.find(route, @streams)

			@adManager = new AdManager({stream: @targetStream})
			@view = new HomePageView({model: @adManager})
Model = require 'models/base/model'

module.exports = class AdProvider extends Model
	runAd: () =>
		"Ads Fired"
	getId: =>
		@get('provider').id
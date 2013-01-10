Model = require 'models/base/model'

module.exports = class Stream extends Model
	getName: ()=>
		@get 'name'
	getStrippedName: ()=>
		@get('name').toLowerCase().replace(" ","")
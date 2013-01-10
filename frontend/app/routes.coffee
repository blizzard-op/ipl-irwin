module.exports = (match) ->
  match 'irwin/v1', 'home#index'
  match 'irwin/v1/', 'home#index'
  match 'irwin/v1/stream/:streamid', 'home#index'
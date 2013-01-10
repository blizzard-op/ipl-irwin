HomePageView = require 'views/home-page-view'

describe 'HomePageView', ->
  beforeEach ->
    @view = new HomePageView

  afterEach ->
    @view.dispose()

  it 'should find two player screens', ->
    expect(@view.$el.find '.player').to.have.length 2

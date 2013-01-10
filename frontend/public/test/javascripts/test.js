(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    definition(module.exports, localRequire(name), module);
    var exports = cache[name] = module.exports;
    return exports;
  };

  var require = function(name) {
    var path = expand(name, '.');

    if (has(cache, path)) return cache[path];
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex];
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.brunch = true;
})();

window.require.register("test/models/StreamsLoader-test", function(exports, require, module) {
  var StreamLoader;

  StreamLoader = require('models/streams-loader');

  describe('StreamsLoader', function() {
    return beforeEach(function() {
      return this.model = new StreamsLoader();
    });
  });
  
});
window.require.register("test/models/ad-manager-test", function(exports, require, module) {
  var AdManager;

  AdManager = require('models/ad-manager');

  describe('AdManager', function() {
    return beforeEach(function() {
      return this.model = new AdManager();
    });
  });
  
});
window.require.register("test/models/ads/ad-provider-test", function(exports, require, module) {
  var AdProvider;

  AdProvider = require('models/ads/ad-provider');

  describe('AdProvider', function() {
    return beforeEach(function() {
      return this.model = new AdProvider();
    });
  });
  
});
window.require.register("test/models/ads/ign-ad-provider-test", function(exports, require, module) {
  var IgnAdProvider;

  IgnAdProvider = require('models/ads/ign-ad-provider');

  describe('IgnAdProvider', function() {
    return beforeEach(function() {
      return this.model = new IgnAdProvider();
    });
  });
  
});
window.require.register("test/models/ads/twitch-ad-provider-test", function(exports, require, module) {
  var TwitchAdProvider;

  TwitchAdProvider = require('models/ads/twitch-ad-provider');

  describe('TwitchAdProvider', function() {
    return beforeEach(function() {
      return this.model = new TwitchAdProvider();
    });
  });
  
});
window.require.register("test/models/stream-test", function(exports, require, module) {
  var Stream;

  Stream = require('models/stream');

  describe('Stream', function() {
    return beforeEach(function() {
      return this.model = new Stream();
    });
  });
  
});
window.require.register("test/models/streams-test", function(exports, require, module) {
  var Collection, Streams;

  Collection = require('models/base/collection');

  Streams = require('models/streams');

  describe('Streams', function() {
    beforeEach(function() {
      this.model = new Streams();
      return this.collection = new Streams();
    });
    return afterEach(function() {
      this.model.dispose();
      return this.collection.dispose();
    });
  });
  
});
window.require.register("test/test-helpers", function(exports, require, module) {
  var chai, sinonChai;

  chai = require('chai');

  sinonChai = require('sinon-chai');

  chai.use(sinonChai);

  module.exports = {
    expect: chai.expect,
    sinon: require('sinon')
  };
  
});
window.require.register("test/views/controls-view-test", function(exports, require, module) {
  var ControlsView;

  ControlsView = require('views/controls-view');

  describe('ControlsView', function() {
    return beforeEach(function() {
      return this.view = new ControlsView();
    });
  });
  
});
window.require.register("test/views/header-view-test", function(exports, require, module) {
  var HeaderView, HeaderViewTest, mediator,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  HeaderView = require('views/header-view');

  mediator = require('mediator');

  HeaderViewTest = (function(_super) {

    __extends(HeaderViewTest, _super);

    function HeaderViewTest() {
      return HeaderViewTest.__super__.constructor.apply(this, arguments);
    }

    HeaderViewTest.prototype.renderTimes = 0;

    HeaderViewTest.prototype.render = function() {
      HeaderViewTest.__super__.render.apply(this, arguments);
      return this.renderTimes += 1;
    };

    return HeaderViewTest;

  })(HeaderView);

  describe('HeaderView', function() {
    beforeEach(function() {
      return this.view = new HeaderViewTest;
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should display 4 links', function() {
      return expect(this.view.$el.find('a')).to.have.length(4);
    });
  });
  
});
window.require.register("test/views/home-page-view-test", function(exports, require, module) {
  var HomePageView;

  HomePageView = require('views/home-page-view');

  describe('HomePageView', function() {
    beforeEach(function() {
      return this.view = new HomePageView;
    });
    afterEach(function() {
      return this.view.dispose();
    });
    return it('should find two player screens', function() {
      return expect(this.view.$el.find('.player')).to.have.length(2);
    });
  });
  
});
window.require.register("test/views/video/ign-video-player-view-test", function(exports, require, module) {
  var IgnVideoPlayerView;

  IgnVideoPlayerView = require('views/video/ign-video-player-view');

  describe('Video/ignVideoPlayerView', function() {
    return beforeEach(function() {
      return this.view = new IgnVideoPlayerView();
    });
  });
  
});
window.require.register("test/views/video/twitch-video-player-view-test", function(exports, require, module) {
  var TwitchVideoPlayerView;

  TwitchVideoPlayerView = require('views/video/twitch-video-player-view');

  describe('Video/twitchVideoPlayerView', function() {
    return beforeEach(function() {
      return this.view = new TwitchVideoPlayerView();
    });
  });
  
});
window.require.register("test/views/video/video-player-view-test", function(exports, require, module) {
  var VideoPlayerView;

  VideoPlayerView = require('views/video/video-player-view');

  describe('Video/videoPlayerView', function() {
    return beforeEach(function() {
      return this.view = new VideoPlayerView();
    });
  });
  
});
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/StreamsLoader-test') : true;
if (valid) window.require('test/models/StreamsLoader-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/ad-manager-test') : true;
if (valid) window.require('test/models/ad-manager-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/ads/ad-provider-test') : true;
if (valid) window.require('test/models/ads/ad-provider-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/ads/ign-ad-provider-test') : true;
if (valid) window.require('test/models/ads/ign-ad-provider-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/ads/twitch-ad-provider-test') : true;
if (valid) window.require('test/models/ads/twitch-ad-provider-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/stream-test') : true;
if (valid) window.require('test/models/stream-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/models/streams-test') : true;
if (valid) window.require('test/models/streams-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/controls-view-test') : true;
if (valid) window.require('test/views/controls-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/header-view-test') : true;
if (valid) window.require('test/views/header-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/home-page-view-test') : true;
if (valid) window.require('test/views/home-page-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/video/ign-video-player-view-test') : true;
if (valid) window.require('test/views/video/ign-video-player-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/video/twitch-video-player-view-test') : true;
if (valid) window.require('test/views/video/twitch-video-player-view-test');
var hasFilterer = window.brunch && window.brunch.test && window.brunch.test.filterer;
var valid = hasFilterer ? window.brunch.test.filterer('test/views/video/video-player-view-test') : true;
if (valid) window.require('test/views/video/video-player-view-test');

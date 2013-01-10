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

window.require.register("application", function(exports, require, module) {
  var Application, Chaplin, HeaderController, Layout, mediator, routes,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  HeaderController = require('controllers/header-controller');

  Layout = require('views/layout');

  mediator = require('mediator');

  routes = require('routes');

  module.exports = Application = (function(_super) {

    __extends(Application, _super);

    function Application() {
      return Application.__super__.constructor.apply(this, arguments);
    }

    Application.prototype.title = 'IRWIN';

    Application.prototype.initialize = function() {
      Application.__super__.initialize.apply(this, arguments);
      this.initDispatcher({
        controllerSuffix: '-controller'
      });
      this.initLayout();
      this.initMediator();
      this.initControllers();
      this.initRouter(routes);
      return typeof Object.freeze === "function" ? Object.freeze(this) : void 0;
    };

    Application.prototype.initLayout = function() {
      return this.layout = new Layout({
        title: this.title
      });
    };

    Application.prototype.initControllers = function() {
      return true;
    };

    Application.prototype.initMediator = function() {
      return mediator.seal();
    };

    return Application;

  })(Chaplin.Application);
  
});
window.require.register("controllers/base/controller", function(exports, require, module) {
  var Chaplin, Controller,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Controller = (function(_super) {

    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    return Controller;

  })(Chaplin.Controller);
  
});
window.require.register("controllers/header-controller", function(exports, require, module) {
  var Controller, HeaderController, HeaderView,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderView = require('views/header-view');

  module.exports = HeaderController = (function(_super) {

    __extends(HeaderController, _super);

    function HeaderController() {
      return HeaderController.__super__.constructor.apply(this, arguments);
    }

    HeaderController.prototype.initialize = function(streams) {
      HeaderController.__super__.initialize.apply(this, arguments);
      return this.view = new HeaderView({
        collection: streams
      });
    };

    return HeaderController;

  })(Controller);
  
});
window.require.register("controllers/home-controller", function(exports, require, module) {
  var AdManager, ControlView, Controller, HeaderController, HomeController, HomePageView, ProviderFinder, StreamFinder, Streams, StreamsLoader,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Controller = require('controllers/base/controller');

  HeaderController = require('controllers/header-controller');

  HomePageView = require('views/home-page-view');

  ControlView = require('views/controls-view');

  Streams = require('models/streams');

  StreamsLoader = require('models/streams-loader');

  StreamFinder = require('utility/stream-finder');

  ProviderFinder = require('utility/provider-finder');

  AdManager = require('models/ad-manager');

  module.exports = HomeController = (function(_super) {

    __extends(HomeController, _super);

    function HomeController() {
      return HomeController.__super__.constructor.apply(this, arguments);
    }

    HomeController.prototype.historyURL = 'home';

    HomeController.prototype.title = 'Home';

    HomeController.prototype.index = function(route) {
      var _this = this;
      this.streamsLoader = new StreamsLoader();
      return this.streamsLoader.on('change:streamsLoaded', function(loader) {
        _this.streams = new Streams(loader.get('streamsLoaded'));
        _this.header = new HeaderController(_this.streams);
        _this.targetStream = StreamFinder.find(route, _this.streams);
        _this.adManager = new AdManager({
          stream: _this.targetStream
        });
        return _this.view = new HomePageView({
          model: _this.adManager
        });
      });
    };

    return HomeController;

  })(Controller);
  
});
window.require.register("initialize", function(exports, require, module) {
  var Application;

  Application = require('application');

  $(function() {
    var app;
    app = new Application();
    return app.initialize();
  });
  
});
window.require.register("lib/support", function(exports, require, module) {
  var Chaplin, support, utils;

  Chaplin = require('chaplin');

  utils = require('lib/utils');

  support = utils.beget(Chaplin.support);

  module.exports = support;
  
});
window.require.register("lib/utils", function(exports, require, module) {
  var Chaplin, utils;

  Chaplin = require('chaplin');

  utils = Chaplin.utils.beget(Chaplin.utils);

  module.exports = utils;
  
});
window.require.register("lib/view-helper", function(exports, require, module) {
  var mediator;

  mediator = require('mediator');

  Handlebars.registerHelper('with', function(context, options) {
    if (!context || Handlebars.Utils.isEmpty(context)) {
      return options.inverse(this);
    } else {
      return options.fn(context);
    }
  });

  Handlebars.registerHelper('without', function(context, options) {
    var inverse;
    inverse = options.inverse;
    options.inverse = options.fn;
    options.fn = inverse;
    return Handlebars.helpers["with"].call(this, context, options);
  });
  
});
window.require.register("mediator", function(exports, require, module) {
  
  module.exports = require('chaplin').mediator;
  
});
window.require.register("models/ad-manager", function(exports, require, module) {
  var AdManager, AdTimer, IgnAdProvider, Model, TwitchAdProvider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  AdTimer = require('utility/ad-timer');

  TwitchAdProvider = require('models/ads/twitch-ad-provider');

  IgnAdProvider = require('models/ads/ign-ad-provider');

  module.exports = AdManager = (function(_super) {

    __extends(AdManager, _super);

    function AdManager() {
      this.nextAdTime = __bind(this.nextAdTime, this);

      this.stopAds = __bind(this.stopAds, this);

      this.startAds = __bind(this.startAds, this);

      this.runAds = __bind(this.runAds, this);
      return AdManager.__super__.constructor.apply(this, arguments);
    }

    AdManager.prototype.defaults = {
      stream: null,
      autoPlayAds: false,
      adProviders: [],
      adDelay: 35
    };

    AdManager.prototype.initialize = function() {
      var adProviders;
      AdManager.__super__.initialize.apply(this, arguments);
      adProviders = [
        new TwitchAdProvider({
          stream: this.get('stream')
        }), new IgnAdProvider({
          stream: this.get('stream')
        })
      ];
      return this.set('adProviders', adProviders);
    };

    AdManager.prototype.runAds = function() {
      var provider, _i, _len, _ref;
      _ref = this.get('adProviders');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        provider = _ref[_i];
        provider.runAd();
      }
      if (Boolean(this.get('autoPlayAds')) === true) {
        return AdTimer.start({
          time: this.get('adDelay'),
          complete: this.runAds,
          update: this.nextAdTime
        });
      }
    };

    AdManager.prototype.startAds = function() {
      this.set('autoPlayAds', true);
      return this.runAds();
    };

    AdManager.prototype.stopAds = function() {
      this.set('autoPlayAds', false);
      return AdTimer.stop();
    };

    AdManager.prototype.nextAdTime = function() {
      return this.set('timeLeft', AdTimer.timeLeft);
    };

    return AdManager;

  })(Model);
  
});
window.require.register("models/ads/ad-provider", function(exports, require, module) {
  var AdProvider, Model,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = AdProvider = (function(_super) {

    __extends(AdProvider, _super);

    function AdProvider() {
      this.getId = __bind(this.getId, this);

      this.runAd = __bind(this.runAd, this);
      return AdProvider.__super__.constructor.apply(this, arguments);
    }

    AdProvider.prototype.runAd = function() {
      return "Ads Fired";
    };

    AdProvider.prototype.getId = function() {
      return this.get('provider').id;
    };

    return AdProvider;

  })(Model);
  
});
window.require.register("models/ads/ign-ad-provider", function(exports, require, module) {
  var AdProvider, IgnAdProvider, ProviderFinder,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AdProvider = require('models/ads/ad-provider');

  ProviderFinder = require('utility/provider-finder');

  module.exports = IgnAdProvider = (function(_super) {

    __extends(IgnAdProvider, _super);

    function IgnAdProvider() {
      this.getId = __bind(this.getId, this);

      this.runAd = __bind(this.runAd, this);

      this.initialize = __bind(this.initialize, this);
      return IgnAdProvider.__super__.constructor.apply(this, arguments);
    }

    IgnAdProvider.prototype.initialize = function() {
      IgnAdProvider.__super__.initialize.apply(this, arguments);
      return this.set('provider', ProviderFinder.find('ign', this.get('stream')));
    };

    IgnAdProvider.prototype.runAd = function() {
      console.log("ran IGN ad");
      return IgnAdProvider.__super__.runAd.apply(this, arguments);
    };

    IgnAdProvider.prototype.getId = function() {
      return this.get('stream').get('id');
    };

    return IgnAdProvider;

  })(AdProvider);
  
});
window.require.register("models/ads/twitch-ad-provider", function(exports, require, module) {
  var AdProvider, ProviderFinder, TwitchAdProvider,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  AdProvider = require('models/ads/ad-provider');

  ProviderFinder = require('utility/provider-finder');

  module.exports = TwitchAdProvider = (function(_super) {

    __extends(TwitchAdProvider, _super);

    function TwitchAdProvider() {
      this.runAd = __bind(this.runAd, this);

      this.initialize = __bind(this.initialize, this);
      return TwitchAdProvider.__super__.constructor.apply(this, arguments);
    }

    TwitchAdProvider.prototype.initialize = function() {
      TwitchAdProvider.__super__.initialize.apply(this, arguments);
      return this.set('provider', ProviderFinder.find('twitch', this.get('stream')));
    };

    TwitchAdProvider.prototype.runAd = function() {
      $.ajax({
        url: 'http://test.ign.com:9406/irwin/v1/run-ad-on/twitch/for/' + this.getId(),
        type: 'POST'
      });
      console.log('twitch request made');
      return TwitchAdProvider.__super__.runAd.apply(this, arguments);
    };

    return TwitchAdProvider;

  })(AdProvider);
  
});
window.require.register("models/base/collection", function(exports, require, module) {
  var Chaplin, Collection, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  Model = require('models/base/model');

  module.exports = Collection = (function(_super) {

    __extends(Collection, _super);

    function Collection() {
      return Collection.__super__.constructor.apply(this, arguments);
    }

    Collection.prototype.model = Model;

    return Collection;

  })(Chaplin.Collection);
  
});
window.require.register("models/base/model", function(exports, require, module) {
  var Chaplin, Model,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Model = (function(_super) {

    __extends(Model, _super);

    function Model() {
      return Model.__super__.constructor.apply(this, arguments);
    }

    return Model;

  })(Chaplin.Model);
  
});
window.require.register("models/stream", function(exports, require, module) {
  var Model, Stream,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = Stream = (function(_super) {

    __extends(Stream, _super);

    function Stream() {
      this.getStrippedName = __bind(this.getStrippedName, this);

      this.getName = __bind(this.getName, this);
      return Stream.__super__.constructor.apply(this, arguments);
    }

    Stream.prototype.getName = function() {
      return this.get('name');
    };

    Stream.prototype.getStrippedName = function() {
      return this.get('name').toLowerCase().replace(" ", "");
    };

    return Stream;

  })(Model);
  
});
window.require.register("models/streams-loader", function(exports, require, module) {
  var Model, StreamsLoader,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Model = require('models/base/model');

  module.exports = StreamsLoader = (function(_super) {

    __extends(StreamsLoader, _super);

    function StreamsLoader() {
      return StreamsLoader.__super__.constructor.apply(this, arguments);
    }

    StreamsLoader.prototype.initialize = function() {
      var _this = this;
      return $.ajax({
        url: "http://esports.ign.com/content/v1/streams.json",
        dataType: 'jsonp',
        cached: true,
        jsonpCallback: 'getCachedStreams',
        success: function(data) {
          return _this.set('streamsLoaded', data);
        },
        error: function(er) {
          return console.log("Error loading streams");
        }
      });
    };

    return StreamsLoader;

  })(Model);
  
});
window.require.register("models/streams", function(exports, require, module) {
  var Collection, Stream, Streams,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Collection = require('models/base/collection');

  Stream = require('models/stream');

  module.exports = Streams = (function(_super) {

    __extends(Streams, _super);

    function Streams() {
      return Streams.__super__.constructor.apply(this, arguments);
    }

    Streams.prototype.model = Stream;

    return Streams;

  })(Collection);
  
});
window.require.register("routes", function(exports, require, module) {
  
  module.exports = function(match) {
    match('irwin/v1', 'home#index');
    match('irwin/v1/', 'home#index');
    return match('irwin/v1/stream/:streamid', 'home#index');
  };
  
});
window.require.register("utility/ad-timer", function(exports, require, module) {
  var AdTimer;

  module.exports = AdTimer = (function() {

    function AdTimer() {}

    AdTimer.start = function(options) {
      if (AdTimer.curTimer != null) {
        window.clearTimeout(AdTimer.curTimer);
        window.clearInterval(AdTimer.curInterval);
      }
      AdTimer.updateFunc = options.update;
      AdTimer.timeLeft = options.time * 1000;
      AdTimer.curTimer = window.setTimeout(options.complete, options.time * 1000);
      return AdTimer.curInterval = window.setInterval(AdTimer.update, 1000 / 30);
    };

    AdTimer.stop = function() {
      window.clearTimeout(AdTimer.curTimer);
      return window.clearInterval(AdTimer.curInterval);
    };

    AdTimer.update = function() {
      AdTimer.timeLeft -= 1000 / 30;
      if (AdTimer.updateFunc != null) {
        return AdTimer.updateFunc();
      }
    };

    return AdTimer;

  }).call(this);
  
});
window.require.register("utility/provider-finder", function(exports, require, module) {
  var ProviderFinder;

  module.exports = ProviderFinder = (function() {

    function ProviderFinder() {}

    ProviderFinder.find = function(query, stream) {
      var provider, _i, _len, _ref;
      _ref = stream.get('providers');
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        provider = _ref[_i];
        if (provider.name === query) {
          return provider;
        }
      }
    };

    return ProviderFinder;

  }).call(this);
  
});
window.require.register("utility/stream-finder", function(exports, require, module) {
  var StreamFinder;

  module.exports = StreamFinder = (function() {

    function StreamFinder() {}

    StreamFinder.find = function(query, streams) {
      var stream, _i, _len, _ref;
      query = query['streamid'] != null ? query : {
        streamid: "sc21"
      };
      _ref = streams.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        stream = _ref[_i];
        if (query.streamid === stream.getStrippedName()) {
          return stream;
        }
      }
    };

    return StreamFinder;

  }).call(this);
  
});
window.require.register("views/base/collection-view", function(exports, require, module) {
  var Chaplin, CollectionView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  View = require('views/base/view');

  module.exports = CollectionView = (function(_super) {

    __extends(CollectionView, _super);

    function CollectionView() {
      return CollectionView.__super__.constructor.apply(this, arguments);
    }

    CollectionView.prototype.getTemplateFunction = View.prototype.getTemplateFunction;

    return CollectionView;

  })(Chaplin.CollectionView);
  
});
window.require.register("views/base/view", function(exports, require, module) {
  var Chaplin, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  require('lib/view-helper');

  module.exports = View = (function(_super) {

    __extends(View, _super);

    function View() {
      return View.__super__.constructor.apply(this, arguments);
    }

    View.prototype.getTemplateFunction = function() {
      return this.template;
    };

    return View;

  })(Chaplin.View);
  
});
window.require.register("views/controls-view", function(exports, require, module) {
  var AdTimer, ControlsView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/controls');

  AdTimer = require('utility/ad-timer');

  module.exports = ControlsView = (function(_super) {

    __extends(ControlsView, _super);

    function ControlsView() {
      this.updateTimer = __bind(this.updateTimer, this);

      this.changeStatus = __bind(this.changeStatus, this);

      this.pressStop = __bind(this.pressStop, this);

      this.pressPlay = __bind(this.pressPlay, this);
      return ControlsView.__super__.constructor.apply(this, arguments);
    }

    ControlsView.prototype.template = template;

    ControlsView.prototype.autoRender = true;

    ControlsView.prototype.className = 'ad-controls';

    ControlsView.prototype.container = '#control-container';

    ControlsView.prototype.events = {
      'click #play-ads-btn': 'pressPlay',
      'click #stop-ads-btn': 'pressStop'
    };

    ControlsView.prototype.initialize = function() {
      ControlsView.__super__.initialize.apply(this, arguments);
      this.model.on('change:autoPlayAds', this.changeStatus);
      return this.model.on('change:timeLeft', this.updateTimer);
    };

    ControlsView.prototype.render = function() {
      ControlsView.__super__.render.apply(this, arguments);
      this.$el.find('#stop-ads-btn').hide();
      this.$el.find('#ad-timer').hide();
      return this;
    };

    ControlsView.prototype.pressPlay = function() {
      this.$el.find('#play-ads-btn').hide();
      this.$el.find('#stop-ads-btn').show();
      this.$el.find('#ad-timer').show();
      return this.model.startAds();
    };

    ControlsView.prototype.pressStop = function() {
      this.$el.find('#stop-ads-btn').hide();
      this.$el.find('#play-ads-btn').show();
      this.$el.find('#ad-timer').hide();
      return this.model.stopAds();
    };

    ControlsView.prototype.changeStatus = function() {
      var as;
      as = this.$el.find('#ad-status');
      return as.html("Are ads running? " + (this.model.get('autoPlayAds') ? '<span class="yes-ads">Yes!</span>' : '<span class="no-ads">NO</span>'));
    };

    ControlsView.prototype.updateTimer = function() {
      return this.$el.find('#ad-timer').text(" Time to next ad: " + (AdTimer.timeLeft / 1000).toFixed(2));
    };

    return ControlsView;

  })(View);
  
});
window.require.register("views/header-view", function(exports, require, module) {
  var HeaderView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/header');

  module.exports = HeaderView = (function(_super) {

    __extends(HeaderView, _super);

    function HeaderView() {
      return HeaderView.__super__.constructor.apply(this, arguments);
    }

    HeaderView.prototype.autoRender = true;

    HeaderView.prototype.className = 'header';

    HeaderView.prototype.container = '#header-container';

    HeaderView.prototype.id = 'header';

    HeaderView.prototype.template = template;

    HeaderView.prototype.initialize = function() {
      var i, _i, _ref, _ref1, _results;
      HeaderView.__super__.initialize.apply(this, arguments);
      this.activeStreams = [];
      if (((_ref = this.collection) != null ? _ref.length : void 0) > 0) {
        _results = [];
        for (i = _i = 0, _ref1 = this.collection.length; 0 <= _ref1 ? _i < _ref1 : _i > _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          _results.push(this.activeStreams.push({
            label: this.collection.at(i).getName(),
            link: this.collection.at(i).getStrippedName()
          }));
        }
        return _results;
      }
    };

    HeaderView.prototype.render = function() {
      HeaderView.__super__.render.apply(this, arguments);
      this.$el.html(template({
        activeStreams: this.activeStreams
      }));
      return this;
    };

    return HeaderView;

  })(View);
  
});
window.require.register("views/home-page-view", function(exports, require, module) {
  var ControlsView, HomePageView, IgnVideoPlayerView, ProviderFinder, TwitchVideoPlayerView, View, template,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  template = require('views/templates/home');

  View = require('views/base/view');

  TwitchVideoPlayerView = require('views/video/twitch-video-player-view');

  IgnVideoPlayerView = require('views/video/ign-video-player-view');

  ProviderFinder = require('utility/provider-finder');

  ControlsView = require('views/controls-view');

  module.exports = HomePageView = (function(_super) {

    __extends(HomePageView, _super);

    function HomePageView() {
      return HomePageView.__super__.constructor.apply(this, arguments);
    }

    HomePageView.prototype.autoRender = true;

    HomePageView.prototype.className = 'home-page';

    HomePageView.prototype.container = '#page-container';

    HomePageView.prototype.template = template;

    HomePageView.prototype.initialize = function() {
      HomePageView.__super__.initialize.apply(this, arguments);
      this.videoProviders = [
        new TwitchVideoPlayerView({
          model: this.model.get('stream')
        }), new IgnVideoPlayerView({
          model: this.model.get('stream')
        })
      ];
      return this.controls = new ControlsView({
        model: this.model
      });
    };

    HomePageView.prototype.render = function() {
      var a, _i, _len, _ref;
      HomePageView.__super__.render.apply(this, arguments);
      _ref = this.videoProviders;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        a = _ref[_i];
        a.$el.appendTo(this.$el.find("#video-container"));
      }
      return this;
    };

    return HomePageView;

  })(View);
  
});
window.require.register("views/layout", function(exports, require, module) {
  var Chaplin, Layout,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Chaplin = require('chaplin');

  module.exports = Layout = (function(_super) {

    __extends(Layout, _super);

    function Layout() {
      return Layout.__super__.constructor.apply(this, arguments);
    }

    return Layout;

  })(Chaplin.Layout);
  
});
window.require.register("views/templates/controls", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"controls\">\n	<button id=\"play-ads-btn\">PLAY ADS</button>\n	<button id=\"stop-ads-btn\">STOP ADS</button>\n	<h3 id=\"ad-timer\">00.00</h3>\n	<h3 id=\"ad-status\">Are ads running? <span class=\"no-ads\">NO</span></h3>\n</div>";});
});
window.require.register("views/templates/header", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

  function program1(depth0,data) {
    
    var buffer = "", stack1, foundHelper;
    buffer += "\n		<li><a href=\"/irwin/v1/stream/";
    foundHelper = helpers.link;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.link; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">";
    foundHelper = helpers.label;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "</a></li>\n	";
    return buffer;}

    buffer += "<ul>\n<li>Streams:</li>\n	";
    stack1 = depth0.activeStreams;
    stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
    if(stack1 || stack1 === 0) { buffer += stack1; }
    buffer += "\n</ul>";
    return buffer;});
});
window.require.register("views/templates/home", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    


    return "<div id=\"video-container\">\n\n</div>";});
});
window.require.register("views/templates/video/ign-video-player", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<h3>IGN<h3>\n<object type=\"application/x-shockwave-flash\" data=\"http://media.ign.com/ev/esports/ipl-static/ipl-site/v2/swfs/ignplayer_ipl.swf?version=3.120612.02\" width=\"100%\" height=\"100%\" id=\"hero_video_target\" style=\"visibility: visible;\">\n<param name=\"quality\" value=\"high\">\n<param name=\"allowscriptaccess\" value=\"always\">\n<param name=\"allowfullscreen\" value=\"true\">\n<param name=\"bgcolor\" value=\"#000000\">\n<param name=\"flashvars\" value=\"qs_automute=true&amp;cacheBusting=true&amp;url=http://esports.ign.com/content/v1/streams/";
    foundHelper = helpers.streamId;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.streamId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "?qs_autoplay=true\"></object>";
    return buffer;});
});
window.require.register("views/templates/video/twitch-video-player", function(exports, require, module) {
  module.exports = Handlebars.template(function (Handlebars,depth0,helpers,partials,data) {
    helpers = helpers || Handlebars.helpers;
    var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


    buffer += "<h3>Twitch</h3>\n<object type=\"application/x-shockwave-flash\" height=\"100%\" width=\"100%\" data=\"http://www.justin.tv/widgets/jtv_player.swf?channel=";
    foundHelper = helpers.streamId;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.streamId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "\">\n<param name=\"movie\" value=\"http://www.justin.tv/widgets/jtv_player.swf\">\n<param name=\"flashvars\" value=\"start_volume=0&amp;channel=";
    foundHelper = helpers.streamId;
    if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
    else { stack1 = depth0.streamId; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
    buffer += escapeExpression(stack1) + "&amp;auto_play=true&amp;&amp;enable_javascript=true&amp;consumer_key=96OPe6EWesFs5PdLgQzxA\">\n<param name=\"allowFullScreen\" value=\"true\">\n<param name=\"allowScriptAccess\" value=\"always\">\n<param name=\"allowNetworking\" value=\"all\">\n<param name=\"wmode\" value=\"transparent\">\n</object>";
    return buffer;});
});
window.require.register("views/video/ign-video-player-view", function(exports, require, module) {
  var IgnVideoPlayerView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/video/ign-video-player');

  module.exports = IgnVideoPlayerView = (function(_super) {

    __extends(IgnVideoPlayerView, _super);

    function IgnVideoPlayerView() {
      this.render = __bind(this.render, this);
      return IgnVideoPlayerView.__super__.constructor.apply(this, arguments);
    }

    IgnVideoPlayerView.prototype.autoRender = true;

    IgnVideoPlayerView.prototype.template = template;

    IgnVideoPlayerView.prototype.className = 'video-player';

    IgnVideoPlayerView.prototype.container = '#video';

    IgnVideoPlayerView.prototype.initialize = function() {
      IgnVideoPlayerView.__super__.initialize.apply(this, arguments);
      return this.streamId = this.model.get('id');
    };

    IgnVideoPlayerView.prototype.render = function() {
      IgnVideoPlayerView.__super__.render.apply(this, arguments);
      this.$el.html(template({
        streamId: this.streamId
      }));
      return this;
    };

    return IgnVideoPlayerView;

  })(View);
  
});
window.require.register("views/video/twitch-video-player-view", function(exports, require, module) {
  var ProviderFinder, TwitchVideoPlayerView, View, template,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  template = require('views/templates/video/twitch-video-player');

  ProviderFinder = require('utility/provider-finder');

  module.exports = TwitchVideoPlayerView = (function(_super) {

    __extends(TwitchVideoPlayerView, _super);

    function TwitchVideoPlayerView() {
      this.render = __bind(this.render, this);
      return TwitchVideoPlayerView.__super__.constructor.apply(this, arguments);
    }

    TwitchVideoPlayerView.prototype.autoRender = true;

    TwitchVideoPlayerView.prototype.template = template;

    TwitchVideoPlayerView.prototype.className = 'video-player';

    TwitchVideoPlayerView.prototype.container = '#video';

    TwitchVideoPlayerView.prototype.initialize = function() {
      TwitchVideoPlayerView.__super__.initialize.apply(this, arguments);
      return this.streamId = ProviderFinder.find('twitch', this.model).id;
    };

    TwitchVideoPlayerView.prototype.render = function() {
      TwitchVideoPlayerView.__super__.render.apply(this, arguments);
      this.$el.html(template({
        streamId: this.streamId
      }));
      return this;
    };

    return TwitchVideoPlayerView;

  })(View);
  
});
window.require.register("views/video/video-player-view", function(exports, require, module) {
  var VideoPlayerView, View,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  View = require('views/base/view');

  module.exports = VideoPlayerView = (function(_super) {

    __extends(VideoPlayerView, _super);

    function VideoPlayerView() {
      return VideoPlayerView.__super__.constructor.apply(this, arguments);
    }

    VideoPlayerView.prototype.autoRender = false;

    return VideoPlayerView;

  })(View);
  
});

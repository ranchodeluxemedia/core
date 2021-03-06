// Generated by CoffeeScript 1.3.3
(function() {
  var AccountController, AccountFormView, AccountModel, AccountsCollection, AccountsListItemView, AccountsListView, AccountsPage, App, Layla, LaylaPage, LaylaView, PageController, PageFormView, PageModel, PageOnsiteView, PagesCollection, PagesListView, PagesPage, layla, root,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.debug = true;

  Layla = (function() {

    function Layla() {
      this.pages = {
        accounts: new AccountsPage,
        pages: new PagesPage
      };
    }

    Layla.prototype.getPage = function(page) {
      return this.pages[page];
    };

    Layla.prototype.getActivePage = function() {
      return this.pages[this.activePage];
    };

    Layla.prototype.toPage = function(page) {
      return this.getPage(page).toPage();
    };

    Layla.prototype.to = function(page, view) {
      var homeView, toHomeViewCallback, toPageCallback, toViewCallback;
      if (!this.activePage) {
        this.activePage = page;
        toPageCallback = this.toPage(page);
        toPageCallback(function() {});
      }
      toViewCallback = this.pages[page].toView({
        view: view
      });
      if (!toViewCallback) {
        toViewCallback = function(callback) {
          if (callback) {
            return callback();
          }
        };
      }
      if (page !== this.activePage) {
        homeView = this.getActivePage().getHomeView();
        toHomeViewCallback = this.getActivePage().toView({
          view: homeView,
          immediately: true
        });
        if (!toHomeViewCallback) {
          toHomeViewCallback = function(callback) {
            if (callback) {
              return callback();
            }
          };
        }
        this.activePage = page;
        toPageCallback = this.toPage(page);
        toHomeViewCallback(function() {
          return toPageCallback(function() {
            return toViewCallback(function() {});
          });
        });
      } else {
        toViewCallback(function() {});
      }
    };

    return Layla;

  })();

  LaylaPage = (function(_super) {

    __extends(LaylaPage, _super);

    function LaylaPage() {
      return LaylaPage.__super__.constructor.apply(this, arguments);
    }

    LaylaPage.prototype.getHomeView = function() {
      return this.viewsToMap(this.views)[0];
    };

    LaylaPage.prototype.getView = function(view) {
      return this.views[view];
    };

    LaylaPage.prototype.viewsToMap = function(views) {
      var view, _results;
      _results = [];
      for (view in views) {
        _results.push(view);
      }
      return _results;
    };

    LaylaPage.prototype.toView = function(options) {
      var callback;
      callback = this.views[this.activeView].toView(options);
      this.activeView = options.view;
      return callback;
    };

    return LaylaPage;

  })(Backbone.View);

  LaylaView = (function() {

    function LaylaView() {}

    return LaylaView;

  })();

  PageModel = (function(_super) {

    __extends(PageModel, _super);

    function PageModel() {
      return PageModel.__super__.constructor.apply(this, arguments);
    }

    PageModel.prototype.url = function() {
      return '/v1/page/' + this.id(this.id ? void 0 : '/v1/page');
    };

    return PageModel;

  })(Backbone.Model);

  PagesCollection = (function(_super) {

    __extends(PagesCollection, _super);

    function PagesCollection() {
      return PagesCollection.__super__.constructor.apply(this, arguments);
    }

    PagesCollection.prototype.model = PageModel;

    PagesCollection.prototype.url = '/v1/page/all';

    PagesCollection.prototype.parse = function(response) {
      return response.results;
    };

    return PagesCollection;

  })(Backbone.Collection);

  PagesListView = (function(_super) {

    __extends(PagesListView, _super);

    function PagesListView() {
      return PagesListView.__super__.constructor.apply(this, arguments);
    }

    PagesListView.prototype.el = '#pages .list-column .items';

    PagesListView.prototype.isLoaded = false;

    PagesListView.prototype.renderItem = function(page) {
      return this.item.render(page);
    };

    PagesListView.prototype.render = function(collection) {
      var model, _i, _len, _ref;
      $(this.views.list.el).html('');
      _ref = collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        this.views.list.appendItem(model);
      }
      return this.views.list.isLoaded = true;
    };

    PagesListView.prototype.appendItem = function(model) {
      var pagesListItemView;
      pagesListItemView = new PagesListItemView({
        model: model
      });
      return $(this.el).append(pagesListItemView.render(model));
    };

    PagesListView.prototype.toView = function(options) {
      var immediately, view;
      view = options.view;
      immediately = options.immediately;
      switch (view) {
        case 'form':
          if (root.debug) {
            console.log('PagesList is going to animate to PageForm');
          }
          return function(callback) {
            if (immediately) {
              $('#pages .form-column .container').css({
                marginLeft: 0
              });
              $('#pages .list-column .container').css({
                marginLeft: '-300px'
              });
              $('#pages .list-column').css({
                width: 0
              });
              $('#pages .form-column').css({
                right: 300
              });
              $('#pages .versions-column .container').css({
                marginLeft: 0
              });
              return callback();
            } else {
              $('#pages .form-column .container').animate({
                marginLeft: 0
              }, 600);
              $('#pages .list-column .container').animate({
                marginLeft: '-300px'
              }, 600);
              $('#pages .list-column').animate({
                width: 0
              }, 600);
              $('#pages .form-column').animate({
                right: 300
              }, 600);
              $('#pages .versions-column .container').animate({
                marginLeft: 0
              }, 600);
              return setTimeout(callback, 600);
            }
          };
        case 'onsite':
          if (root.debug) {
            console.log('PagesList is going to animate to PageOnsite');
          }
          return function(callback) {
            if (immediately) {
              return callback();
            } else {
              return setTimeout(callback, 600);
            }
          };
      }
    };

    return PagesListView;

  })(LaylaView);

  PageFormView = (function(_super) {

    __extends(PageFormView, _super);

    function PageFormView() {
      return PageFormView.__super__.constructor.apply(this, arguments);
    }

    PageFormView.prototype.toView = function(options) {
      var immediately, view;
      view = options.view;
      immediately = options.immediately;
      switch (view) {
        case 'list':
          if (root.debug) {
            console.log('PageForm is going to animate to PagesList');
          }
          return function(callback) {
            if (immediately) {
              $('#pages .form-column .container').css({
                marginLeft: '100%'
              });
              $('#pages .list-column .container').css({
                marginLeft: 0
              });
              $('#pages .list-column').css({
                width: '100%'
              });
              $('#pages .form-column').css({
                right: 0
              });
              $('#pages .versions-column .container').css({
                marginLeft: '100%'
              });
              return callback();
            } else {
              $('#pages .form-column .container').animate({
                marginLeft: '100%'
              }, 600);
              $('#pages .list-column .container').animate({
                marginLeft: 0
              }, 600);
              $('#pages .list-column').animate({
                width: '100%'
              }, 600);
              $('#pages .form-column').animate({
                right: 0
              }, 600);
              $('#pages .versions-column .container').animate({
                marginLeft: '100%'
              }, 600);
              return setTimeout(callback, 600);
            }
          };
        case 'onsite':
          if (root.debug) {
            console.log('PageForm is going to animate to PageOnsite');
          }
          return function(callback) {
            if (immediately) {
              return callback();
            } else {
              return setTimeout(callback, 600);
            }
          };
      }
    };

    return PageFormView;

  })(LaylaView);

  PageOnsiteView = (function(_super) {

    __extends(PageOnsiteView, _super);

    function PageOnsiteView() {
      return PageOnsiteView.__super__.constructor.apply(this, arguments);
    }

    PageOnsiteView.prototype.toView = function(options) {
      var immediately, view;
      view = options.view;
      immediately = options.immediately;
      switch (view) {
        case 'list':
          if (root.debug) {
            console.log('PageOnsite is going to animate to PagesList');
          }
          return function(callback) {
            if (immediately) {
              return callback();
            } else {
              return setTimeout(callback, 600);
            }
          };
        case 'form':
          if (root.debug) {
            console.log('PageOnsite is going to animate to PageForm');
          }
          return function(callback) {
            if (immediately) {
              return callback();
            } else {
              return setTimeout(callback, 600);
            }
          };
      }
    };

    return PageOnsiteView;

  })(LaylaView);

  PagesPage = (function(_super) {

    __extends(PagesPage, _super);

    function PagesPage() {
      return PagesPage.__super__.constructor.apply(this, arguments);
    }

    PagesPage.prototype.collection = new PagesCollection;

    PagesPage.prototype.activeView = 'list';

    PagesPage.prototype.views = {
      list: new PagesListView,
      form: new PageFormView,
      onsite: new PageOnsiteView
    };

    PagesPage.prototype.toPage = function() {
      if (!this.views.list.isLoaded) {
        this.collection.fetch();
      }
      return function(callback) {
        $('#content > div').hide();
        $('#pages').fadeIn(600);
        return setTimeout(callback, 600);
      };
    };

    return PagesPage;

  })(LaylaPage);

  AccountModel = (function(_super) {

    __extends(AccountModel, _super);

    function AccountModel() {
      return AccountModel.__super__.constructor.apply(this, arguments);
    }

    AccountModel.prototype.url = function() {
      if (!this.isNew()) {
        return '/v1/account/' + this.id;
      } else {
        return '/v1/account';
      }
    };

    AccountModel.prototype.findByVersion = function(options) {
      this.success = options.success;
      this.error = options.error;
      return this.fetch({
        success: this.success,
        error: this.error
      });
    };

    return AccountModel;

  })(Backbone.Model);

  AccountsCollection = (function(_super) {

    __extends(AccountsCollection, _super);

    function AccountsCollection() {
      return AccountsCollection.__super__.constructor.apply(this, arguments);
    }

    AccountsCollection.prototype.model = AccountModel;

    AccountsCollection.prototype.url = '/v1/account/all';

    AccountsCollection.prototype.parse = function(response) {
      return response.results;
    };

    return AccountsCollection;

  })(Backbone.Collection);

  AccountsListItemView = (function(_super) {

    __extends(AccountsListItemView, _super);

    function AccountsListItemView() {
      return AccountsListItemView.__super__.constructor.apply(this, arguments);
    }

    AccountsListItemView.prototype.tagName = 'li';

    AccountsListItemView.prototype.initialize = function() {
      this.template = _.template($('#account-list-item-template').html());
      this.model.bind('change', this.render, this);
      return this.model.bind('destroy', this.remove, this);
    };

    AccountsListItemView.prototype.render = function() {
      return this.$el.html(this.template(this.model.toJSON()));
    };

    AccountsListItemView.prototype.unrender = function() {
      return this.$el.remove();
    };

    AccountsListItemView.prototype.remove = function() {
      return this.model.destroy();
    };

    return AccountsListItemView;

  })(Backbone.View);

  AccountsListView = (function(_super) {

    __extends(AccountsListView, _super);

    function AccountsListView() {
      return AccountsListView.__super__.constructor.apply(this, arguments);
    }

    AccountsListView.prototype.el = '#accounts .list-column .items';

    AccountsListView.prototype.isLoaded = false;

    AccountsListView.prototype.renderItem = function(account) {
      return this.item.render(account);
    };

    AccountsListView.prototype.render = function(collection) {
      var model, _i, _len, _ref;
      $(this.views.list.el).html('');
      _ref = collection.models;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        model = _ref[_i];
        this.views.list.appendItem(model);
      }
      return this.views.list.isLoaded = true;
    };

    AccountsListView.prototype.appendItem = function(model) {
      var accountsListItemView;
      accountsListItemView = new AccountsListItemView({
        model: model
      });
      return $(this.el).append(accountsListItemView.render());
    };

    AccountsListView.prototype.toView = function(options) {
      var immediately, view;
      view = options.view;
      immediately = options.immediately;
      switch (view) {
        case 'form':
          if (root.debug) {
            console.log('AccountsList is going to animate to AccountForm');
          }
          return function(callback) {
            if (immediately) {
              $('#accounts .form-column .container').css({
                marginLeft: 0
              });
              $('#accounts .list-column .container').css({
                marginLeft: '-300px'
              });
              $('#accounts .list-column').css({
                width: 0
              });
              $('#accounts .form-column').css({
                right: 300
              });
              $('#accounts .versions-column .container').css({
                marginLeft: 0
              });
              return callback();
            } else {
              $('#accounts .form-column .container').animate({
                marginLeft: 0
              }, 600);
              $('#accounts .list-column .container').animate({
                marginLeft: '-300px'
              }, 600);
              $('#accounts .list-column').animate({
                width: 0
              }, 600);
              $('#accounts .form-column').animate({
                right: 300
              }, 600);
              $('#accounts .versions-column .container').animate({
                marginLeft: 0
              }, 600);
              return setTimeout(callback, 600);
            }
          };
      }
    };

    return AccountsListView;

  })(LaylaView);

  AccountFormView = (function(_super) {

    __extends(AccountFormView, _super);

    function AccountFormView() {
      return AccountFormView.__super__.constructor.apply(this, arguments);
    }

    AccountFormView.prototype.el = '#accounts .form-column .container';

    AccountFormView.prototype.makeModel = function(id) {
      return new AccountModel({
        id: id
      });
    };

    AccountFormView.prototype.load = function(options) {
      this.id = options.id;
      this.version = options.version;
      return this.makeModel(this.id).findByVersion({
        version: this.version,
        success: function(data) {
          return console.log(data);
        }
      });
    };

    AccountFormView.prototype.render = function(model) {
      alert('redering');
      return $(this.el).html(model.toJSON());
    };

    AccountFormView.prototype.toView = function(options) {
      var immediately, view;
      view = options.view;
      immediately = options.immediately;
      switch (view) {
        case 'list':
          if (root.debug) {
            console.log('AccountForm is going to animate to AccountsList');
          }
          return function(callback) {
            if (immediately) {
              $('#accounts .form-column .container').css({
                marginLeft: '100%'
              });
              $('#accounts .list-column .container').css({
                marginLeft: 0
              });
              $('#accounts .list-column').css({
                width: '100%'
              });
              $('#accounts .form-column').css({
                right: 0
              });
              $('#accounts .versions-column .container').css({
                marginLeft: '100%'
              });
              return callback();
            } else {
              $('#accounts .form-column .container').animate({
                marginLeft: '100%'
              }, 600);
              $('#accounts .list-column .container').animate({
                marginLeft: 0
              }, 600);
              $('#accounts .list-column').animate({
                width: '100%'
              }, 600);
              $('#accounts .form-column').animate({
                right: 0
              }, 600);
              $('#accounts .versions-column .container').animate({
                marginLeft: '100%'
              }, 600);
              return setTimeout(callback, 600);
            }
          };
      }
    };

    return AccountFormView;

  })(LaylaView);

  AccountsPage = (function(_super) {

    __extends(AccountsPage, _super);

    function AccountsPage() {
      this.collection.on('refresh', this.views.list.render, this);
      this.collection.on('reset', this.views.list.render, this);
    }

    AccountsPage.prototype.collection = new AccountsCollection;

    AccountsPage.prototype.activeView = 'list';

    AccountsPage.prototype.views = {
      list: new AccountsListView,
      form: new AccountFormView
    };

    AccountsPage.prototype.toPage = function() {
      if (!this.views.list.isLoaded) {
        this.collection.fetch();
      }
      return function(callback) {
        $('#content > div').hide();
        $('#accounts').fadeIn(600);
        return setTimeout(callback, 600);
      };
    };

    return AccountsPage;

  })(LaylaPage);

  layla = new Layla;

  AccountController = (function(_super) {

    __extends(AccountController, _super);

    function AccountController() {
      return AccountController.__super__.constructor.apply(this, arguments);
    }

    AccountController.prototype.routes = {
      "accounts": "index",
      "accounts/:view": "index",
      "account/add": "add",
      "account/:id": "edit",
      "account/:id/version/:version": "edit"
    };

    AccountController.prototype.index = function(view) {
      if (view == null) {
        view = 'list';
      }
      if (root.debug) {
        console.log("to: accounts/" + view);
      }
      return layla.to('accounts', view);
    };

    AccountController.prototype.edit = function(id, version) {
      layla.getPage('accounts').getView('form').load({
        id: id,
        version: version
      });
      if (version) {
        if (root.debug) {
          return console.log("to: account/" + id + "/version/" + version);
        }
      } else {
        if (root.debug) {
          console.log("to: account/" + id);
        }
        return layla.to('accounts', 'form');
      }
    };

    return AccountController;

  })(Backbone.Router);

  PageController = (function(_super) {

    __extends(PageController, _super);

    function PageController() {
      return PageController.__super__.constructor.apply(this, arguments);
    }

    PageController.prototype.routes = {
      "pages": "index",
      "pages/:view": "index",
      "pages/add": "add",
      "page/:id": "edit",
      "page/:id/version/:version": "edit"
    };

    PageController.prototype.index = function(view) {
      if (view == null) {
        view = 'list';
      }
      if (root.debug) {
        console.log("to: pages/" + view);
      }
      return layla.to('pages', view);
    };

    PageController.prototype.edit = function(id, version) {
      if (version) {
        if (root.debug) {
          return console.log("to: page/" + id + "/version/" + version);
        }
      } else {
        if (root.debug) {
          console.log("to: page/" + id);
        }
        return layla.to('pages', 'form');
      }
    };

    return PageController;

  })(Backbone.Router);

  App = (function() {

    function App() {
      this.controllers = {
        accounts: new AccountController,
        pages: new PageController
      };
    }

    App.prototype.start = function() {
      return Backbone.history.start();
    };

    return App;

  })();

  $(document).ready(function() {
    var app;
    app = new App;
    return app.start();
  });

}).call(this);

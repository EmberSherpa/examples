define("appkit/adapters/application", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // store stuff for all adapters in here
    __exports__["default"] = DS.Adapter.extend({

    });
  });
define("appkit/adapters/comment", 
  ["appkit/adapters/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationAdapter = __dependency1__["default"];

    var ajax = ic.ajax;

    __exports__["default"] = ApplicationAdapter.extend({
      findMany: function(store, type, ids) {
        return ajax("/comments", {
          ids: ids
        }).then(function(array) {
            // normalize the array into an array of comment records in Ember Data Form
            return array;
          });
      }
    });
  });
define("appkit/adapters/post", 
  ["appkit/adapters/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationAdapter = __dependency1__["default"];

    var ajax = ic.ajax;

    __exports__["default"] = ApplicationAdapter.extend({
      find: function(store, type, id) {
        return ajax("/posts/" + id).then(function(json) {
          // normalize JSON into "Ember Data Form"
          return json;
        });
      }
    });
  });
define("appkit/adapters/user", 
  ["appkit/adapters/application","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var ApplicationAdapter = __dependency1__["default"];

    var ajax = ic.ajax;

    __exports__["default"] = ApplicationAdapter.extend({
      find: function(store, type, id) {
        return ajax("/users/" + id).then(function(json) {
          // normal user into "Ember Data Form" and then return the normalized json
          return json;
        });
      }
    });
  });
define("appkit/app", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    var App = Ember.Application.extend({
      LOG_ACTIVE_GENERATION: true,
      LOG_MODULE_RESOLVER: true,
      LOG_TRANSITIONS: true,
      LOG_TRANSITIONS_INTERNAL: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver['default']
    });

    Ember.RSVP.configure('onerror', function(error) {
      // ensure unhandled promises raise awareness.
      // may result in false negatives, but visibility is more important
      if (error instanceof Error) {
        Ember.Logger.assert(false, error);
        Ember.Logger.error(error.stack);
      }
    });

    __exports__["default"] = App;
  });
define("appkit/components/pretty-color", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Component.extend({
      classNames: ['pretty-color'],
      attributeBindings: ['style'],
      style: function(){
        return 'color: ' + this.get('name') + ';';
      }.property('name')
    });
  });
define("appkit/controllers/deck", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.ArrayController.extend({

      actions: {

        'new': function() {
          this.get('deck').createNewSlide();
        },

        save: function(slide) {
          this.get('deck').saveSlide(slide);
        }

      }

    });
  });
define("appkit/controllers/group-by", 
  ["appkit/utils/group-by","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var groupBy = __dependency1__["default"];

    __exports__["default"] = Ember.ArrayController.extend({
      grouped: groupBy('type')
    });
  });
define("appkit/helpers/github-link", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(path) {
      var result = '<a target="_blank" href="https://github.com/embersherpa/examples/blob/master/app/%@">%@</a>'.fmt(path, path);
      return new Ember.Handlebars.SafeString(result);
    });
  });
define("appkit/helpers/reverse-word", 
  ["exports"],
  function(__exports__) {
    "use strict";
    // Please note that Handlebars helpers will only be found automatically by the
    // resolver if their name contains a dash (reverse-word, translate-text, etc.)
    // For more details: http://stefanpenner.github.io/ember-app-kit/guides/using-modules.html

    __exports__["default"] = Ember.Handlebars.makeBoundHelper(function(word) {
      return word.split('').reverse().join('');
    });
  });
define("appkit/models/post", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = DS.Model.extend({
      // because author is not also the name of the model, you specify the name of the model here
      author: DS.belongsTo('user'),
      // Ember Data will automatically singularize `comments` to `comment` and use the CommentAdapter
      comments: DS.hasMany()
    });
  });
define("appkit/router", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

    Router.map(function() {

      this.resource('post', {
        path: '/posts/:post_id'
      });

      this.route('component-test');
      this.route('helper-test');
      this.route('group-by');

      this.route('deck');
    });

    __exports__["default"] = Router;
  });
define("appkit/routes/component_test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['purple', 'green', 'orange'];
      }
    });
  });
define("appkit/routes/deck", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['a','b','c'];
      }
    });
  });
define("appkit/routes/group-by", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return [
          {name: 'Tom',           type: 'cat'},
          {name: 'Jerry',         type: 'mouse'},
          {name: 'Puss in Boots', type: 'cat'},
          {name: 'Bulldog',       type: 'dog'},
          {name: 'Penut',         type: 'dog'}
        ];
      }
    });
  });
define("appkit/routes/helper_test", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return {
          name: "rebmE"
        };
      }
    });
  });
define("appkit/routes/index", 
  ["exports"],
  function(__exports__) {
    "use strict";
    __exports__["default"] = Ember.Route.extend({
      model: function() {
        return ['red', 'yellow', 'blue'];
      }
    });
  });
define("appkit/utils/ajax", 
  ["exports"],
  function(__exports__) {
    "use strict";
    /* global ic */
    __exports__["default"] = function ajax(){
      return ic.ajax.apply(null, arguments);
    }
  });
define("appkit/utils/group-by", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var get = Ember.get;

    __exports__["default"] = function(groupBy) {
      var dependentKey = 'content.@each.' + groupBy;

      return Ember.computed(dependentKey, function(){
        var result = [];

        this.get('content').forEach(function(item){
          var hasGroup = !!result.findBy('group', get(item, groupBy));

          if (!hasGroup) {
            result.pushObject(Ember.Object.create({
              group: get(item, groupBy),
              content: []
            }));
          }

          result.findBy('group', get(item, groupBy)).get('content').pushObject(item);
        });

        return result;
      });
    }
  });
define("appkit/views/deck-collection", 
  ["exports"],
  function(__exports__) {
    "use strict";
    var slideView, newSlideView;

    slideView = Ember.View.extend({
      template: Ember.Handlebars.compile('{{view.content}}')
    });

    newSlideView = Ember.View.extend({
      template: Ember.Handlebars.compile('{{view Ember.TextField value=view.content }}<button {{action "save" view}}>Save</button>')
    });

    __exports__["default"] = Ember.CollectionView.extend({

      tagName: 'ul',

      itemViewClass: slideView,

      setupController: function() {
        // on init, create a reference to this view in the context ( which is the controller )
        this.set('context.deck', this);
      }.on('init'),

      createNewSlide: function() {
        var view = this.createChildView(newSlideView);
        this._childViews.pushObject(view);
        this.rerender();
      },

      saveSlide: function(view) {
        this._childViews.removeObject(view);
        this.get('content').pushObject(view.get('content')); // this will cause rerender() so we don't need to call it
        view.destroy();
      }

    });
  });
//@ sourceMappingURL=app.js.map
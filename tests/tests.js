define("appkit/tests/acceptance/component_test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Component', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('component output is rendered', function(){
      expect(3);

      visit('/component-test').then(function(){
        var title = find('h2#title');
        var list = find('.pretty-color');

        equal(title.text(), 'Ember Sherpa Examples');

        equal(list.length, 3);
        equal(list.first().text(), 'Pretty Color: purple\n');
      });
    });
  });
define("appkit/tests/acceptance/deck_test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Deck', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('deck renders', function(){
      expect(2);

      visit('/deck').then(function(){
        var list = find('ul li.ember-view');
        equal(list.length, 3);
        equal(list.text(), 'abc');
      });
    });

    test('slide added', function(){
      expect(2);

      visit('/deck');
      click('button:contains("Add Slide")');
      fillIn('input', 'hello world!' );
      click('button:contains("Save")')
        .then(function(){
          var list = find('ul li.ember-view');
          equal(list.length, 4);
          equal(list.text(), 'abchello world!');
        });
    });
  });
define("appkit/tests/acceptance/helper_test", 
  [],
  function() {
    "use strict";
    var App;

    module("Acceptances - Helper", {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test("helper output is rendered", function(){
      expect(1);

      visit('/helper-test').then(function(){
        ok(exists("h3:contains('My name is Ember.')"));
      });
    });
  });
define("appkit/tests/acceptance/index_test", 
  [],
  function() {
    "use strict";
    var App;

    module('Acceptances - Index', {
      setup: function(){
        App = startApp();
      },
      teardown: function() {
        Ember.run(App, 'destroy');
      }
    });

    test('index renders', function(){
      expect(3);

      visit('/').then(function(){
        var title = find('h2#title');
        var list = find('ul li');

        equal(title.text(), 'Ember Sherpa Examples');

        equal(list.length, 3);
        equal(list.text(), 'redyellowblue');
      });
    });
  });
define("appkit/tests/helpers/isolated_container", 
  ["resolver","exports"],
  function(__dependency1__, __exports__) {
    "use strict";
    var Resolver = __dependency1__["default"];

    function isolatedContainer(fullNames) {
      var container = new Ember.Container();

      container.optionsForType('component', { singleton: false });
      container.optionsForType('view', { singleton: false });
      container.optionsForType('template', { instantiate: false });
      container.optionsForType('helper', { instantiate: false });
      
      var resolver = Resolver['default'].create();

      resolver.namespace = {
        modulePrefix: 'appkit'
      };

      for (var i = fullNames.length; i > 0; i--) {
        var fullName = fullNames[i - 1];
        container.register(fullName, resolver.resolve(fullName));
      }

      return container;
    }

    __exports__["default"] = isolatedContainer;
  });
define("appkit/tests/helpers/start_app", 
  ["appkit/app","appkit/router","exports"],
  function(__dependency1__, __dependency2__, __exports__) {
    "use strict";
    var Application = __dependency1__["default"];
    var Router = __dependency2__["default"];

    function startApp(attrs) {
      var App;

      var attributes = Ember.merge({
        // useful Test defaults
        rootElement: '#ember-testing',
        LOG_ACTIVE_GENERATION:false,
        LOG_VIEW_LOOKUPS: false
      }, attrs); // but you can override;

      Ember.run.join(function(){
        App = Application.create(attributes);
        App.setupForTesting();
        App.injectTestHelpers();
      });

      Router.reopen({
        location: 'none'
      });

      App.reset(); // this shouldn't be needed, i want to be able to "start an app at a specific URL"

      return App;
    }

    __exports__["default"] = startApp;
  });
define("appkit/tests/unit/routes/index_test", 
  ["appkit/routes/index"],
  function(__dependency1__) {
    "use strict";
    var Index = __dependency1__["default"];

    var route;
    module("Unit - IndexRoute", {
      setup: function(){
        var container = isolatedContainer([
          'route:index'
        ]);

        route = container.lookup('route:index');
      }
    });

    test("it exists", function(){
      ok(route);
      ok(route instanceof Index);
    });

    test("#model", function(){
      deepEqual(route.model(), ['red', 'yellow', 'blue']);
    });
  });
define("appkit/tests/unit/utils/group-by_test", 
  ["appkit/utils/group-by"],
  function(__dependency1__) {
    "use strict";
    var groupBy = __dependency1__["default"];

    module('Unit - groupBy Computed Property');

    test('Objects grouped together', function(){

      expect(4);

      var obj = Ember.Object.extend({
        content: [
          {name: 'Tom', type: 'cat'},
          {name: 'Jerry', type: 'mouse'},
          {name: 'Puss in Boots', 'type': 'cat'},
          {name: 'Bulldog', type: 'dog'},
          {name: 'Penut', type: 'dog'}
        ],
        grouped: groupBy('type')
      }).create();

      var grouped = obj.get('grouped');

      equal(grouped.length, 3);
      equal(grouped.findBy('group', 'cat').get('content.length'), 2);
      equal(grouped.findBy('group', 'mouse').get('content.length'), 1);
      equal(grouped.findBy('group', 'dog').get('content.length'), 2);

    });
  });
//@ sourceMappingURL=tests.js.map
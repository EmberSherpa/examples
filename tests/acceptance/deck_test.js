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

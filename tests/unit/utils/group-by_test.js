import groupBy from 'appkit/utils/group-by';

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
export default Ember.Route.extend({
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
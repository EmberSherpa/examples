import groupBy from 'appkit/utils/group-by';

export default Ember.ArrayController.extend({
  grouped: groupBy('type')
});
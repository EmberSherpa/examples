var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

Router.map(function() {
  this.route('group-by');
  this.route('templateless-components');
  this.route('deck');
});

export default Router;

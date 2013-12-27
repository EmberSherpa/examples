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

export default Router;

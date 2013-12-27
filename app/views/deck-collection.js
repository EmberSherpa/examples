var slideView, newSlideView;

slideView = Ember.View.extend({
  template: Ember.Handlebars.compile('{{view.content}}')
});

newSlideView = Ember.View.extend({
  template: Ember.Handlebars.compile('{{view Ember.TextField value=view.content }}<button {{action "save" view}}>Save</button>')
});

export default Ember.CollectionView.extend({

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
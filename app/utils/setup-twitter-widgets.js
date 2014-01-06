/**
 * Load all twitter widgets after the views were rendered
 */
export default function() {

  Ember.View.reopen({
    loadTweets: function() {
      Ember.run.scheduleOnce('afterRender', function(){
        if (typeof twttr !== 'undefined') {
          twttr.widgets.load();
        }
      });
    }.on('didInsertElement')
  });

}
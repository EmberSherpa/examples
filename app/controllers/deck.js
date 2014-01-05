export default Ember.ArrayController.extend({

  actions: {

    'new': function() {
      this.get('deck').createNewSlide();
    },

    save: function(slide) {
      this.get('deck').saveSlide(slide);
    }

  }

});
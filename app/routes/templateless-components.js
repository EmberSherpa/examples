export default Ember.Route.extend({
  model: function() {
    return [
      { title: "Hello World!", content: "We come in peace!" },
      { title: "Bring us to your leader", content: "We have business to discuss!"},
      { title: "CATS", content:"All of your bases now belong to us!" },
      { title: "Breaking News", content: "Well that escalated quickly" }
    ]
  }
});
export default DS.Model.extend({
  // because author is not also the name of the model, you specify the name of the model here
  author: DS.belongsTo('user'),
  // Ember Data will automatically singularize `comments` to `comment` and use the CommentAdapter
  comments: DS.hasMany()
});
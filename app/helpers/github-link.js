export default Ember.Handlebars.makeBoundHelper(function(path) {
  var result = '<a target="_blank" href="https://github.com/embersherpa/examples/blob/master/app/%@">%@</a>'.fmt(path, path);
  return new Handlebars.SafeString(result);
});
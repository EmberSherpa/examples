import ApplicationAdapter from 'appkit/adapters/application';

var ajax = ic.ajax;

export default ApplicationAdapter.extend({
  find: function(store, type, id) {
    return ajax("/posts/" + id).then(function(json) {
      // normalize JSON into "Ember Data Form"
      return json;
    });
  }
});
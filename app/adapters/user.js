import ApplicationAdapter from 'appkit/adapters/application';

var ajax = ic.ajax;

export default ApplicationAdapter.extend({
  find: function(store, type, id) {
    return ajax("/users/" + id).then(function(json) {
      // normal user into "Ember Data Form" and then return the normalized json
      return json;
    });
  }
});
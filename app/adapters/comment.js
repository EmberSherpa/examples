import ApplicationAdapter from 'appkit/adapters/application';

var ajax = ic.ajax;

export default ApplicationAdapter.extend({
  findMany: function(store, type, ids) {
    return ajax("/comments", {
      ids: ids
    }).then(function(array) {
        // normalize the array into an array of comment records in Ember Data Form
        return array;
      });
  }
});
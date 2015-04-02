var get = Ember.get;

export default function(groupBy) {
  var dependentKey = 'content.@each.' + groupBy;

  return Ember.computed(dependentKey, function(){
    var result = [];

    this.get('content').forEach(function(item){
      var existentGroup = result.findBy('group', get(item, groupBy));

      if (!existentGroup) {
        result.pushObject(Ember.Object.create({
          group: get(item, groupBy),
          content: [ item ]
        }));
      } else {
        existentGroup.get('content').pushObject(item);
      }
    });

    return result;
  });
}
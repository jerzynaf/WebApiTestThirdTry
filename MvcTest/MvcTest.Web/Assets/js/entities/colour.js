PeopleManager.module("Entities", function (Entities, PeopleManager, Backbone, Marionette, $, _) {
  Entities.Colour = Backbone.Model.extend({
  });

  Entities.Colours = Backbone.Collection.extend({
    model: Entities.Colour
  });

  var API = {
    getColoursEntities: function (rawColours) {
      var coloursCollection = new Entities.Colours(rawColours);
      return coloursCollection;
    }
  };

  PeopleManager.reqres.setHandler("colour:entities", function (rawColours) {
    return API.getColoursEntities(rawColours);
  });
});
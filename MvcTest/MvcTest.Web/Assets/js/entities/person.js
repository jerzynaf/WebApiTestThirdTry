﻿PeopleManager.module("Entities", function (Entities, PeopleManager, Backbone, Marionette, $, _) {
  Entities.Person = Backbone.Model.extend({
    urlRoot: "api/PeopleApi",

    defaults: {
      firstName: "",
      lastName: ""
    }
  });

  Entities.PeopleCollection = Backbone.Collection.extend({
    url: "api/PeopleApi",
    model: Entities.Person
  });

  var API = {
    getPeopleEntities: function () {
      var people = new Entities.PeopleCollection();
      var defer = $.Deferred();
      people.fetch({
        success: function (data) {
          defer.resolve(data);
        }
      });
      var promise = defer.promise();
      $.when(promise).done(function (fetchedPeople) {
        if (fetchedPeople.length === 0) {
          alert("No people");
        }
      });
      return promise;
    },

    getPersontEntity: function (personId) {
      var person = new Entities.Person({ id: personId });
      var defer = $.Deferred();
      person.fetch({
        success: function (data) {
          defer.resolve(data);
        },
        error: function (data) {
          defer.resolve(undefined);
        }
      });
      return defer.promise();
    }
  };

  PeopleManager.reqres.setHandler("person:entities", function () {
    return API.getPersonEntities();
  });

  PeopleManager.reqres.setHandler("person:entity", function (id) {
    return API.getPersonEntity(id);
  });
});
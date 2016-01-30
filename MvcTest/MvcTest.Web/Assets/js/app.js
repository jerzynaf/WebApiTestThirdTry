﻿var PeopleManager = new Marionette.Application();

PeopleManager.navigate = function (route, options) {
  options || (options = {});
  Backbone.history.navigate(route, options);
};

PeopleManager.getCurrentRoute = function () {
  return Backbone.history.fragment;
};

PeopleManager.on("start", function () {
  var RegionContainer = Marionette.LayoutView.extend({
    el: "#app-container",

    regions: {
      main: "#main-region"
    }
  });

  PeopleManager.regions = new RegionContainer();

  if (Backbone.history) {
    Backbone.history.start();

    if (this.getCurrentRoute() === "") {
      ContactManager.trigger("contacts:list");
    }
  }
});
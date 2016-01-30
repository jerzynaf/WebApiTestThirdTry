PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.Layout = Marionette.LayoutView.extend({
    template: "#people-layout",
    regions: {
      peopleListRegion: "#people-list-region"
    }
  });

  List.Person = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#people-list-item",

    events: {
      "click a": "editPersonClicked"
    },

    editPersonClicked: function (e) {
      alert("editPerson->listView.js");
    }
  });

  var NoPeopleView = Marionette.ItemView.extend({
    template: "#people-list-none",
    tagName: "tr",
    className: "alert"
  });

  List.People = Marionette.CompositeView.extend({
    tagName: "table",
    className: "table table-hover",
    template: "#people-list",
    emptyView: NoPeopleView,
    childView: List.Person,
    childViewContainer: "tbody"
  });
});
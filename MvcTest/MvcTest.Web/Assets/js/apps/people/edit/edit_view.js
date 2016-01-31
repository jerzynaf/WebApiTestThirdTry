PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {

  Edit.Form = Marionette.LayoutView.extend({
    template: "#person-view",

    events: {
      "click button.js-submit": "submitClicked",
      "click button.js-cancel": "cancelClicked",
      "click #is-authorised-label": "isAuthorisedClicked",
      "click #is-enabled-label": "isEnabledClicked"
    },
    ui:{
      isAuthorised: "#is-authorised",
      isEnabled: "#is-enabled"
  },
    regions: {
      favouriteColours: "#favourite-colours"
    },

    submitClicked: function (e) {
      e.preventDefault();
      var region = this.getRegion("favouriteColours");
      var view = region.currentView;
      var colours = view.collection;

      var data = Backbone.Syphon.serialize(this);
      data.colours = colours.toJSON();
      this.trigger("form:submit", data);
    },

    cancelClicked: function (e) {
      e.preventDefault();
      this.trigger("person:cancelEditing");
    },

    isAuthorisedClicked: function (e) {
      e.preventDefault();
      this.ui.isAuthorised.toggle();
    },

    isEnabledClicked: function (e) {
      e.preventDefault();
      this.ui.isEnabled.toggle();
    }

  });

  Edit.Colour = Marionette.ItemView.extend({
    template: "#colour-list-item",
    events: {
      "click input" : "colourClicked"
    },
    colourClicked: function(e) {
      this.model.set("isChecked", e.target.checked);
    }
  });

  Edit.Colours = Marionette.CollectionView.extend({
    childView: Edit.Colour
  });



  Edit.MissingPerson = Marionette.ItemView.extend({
    template: "#missing-person-view"
  });

});
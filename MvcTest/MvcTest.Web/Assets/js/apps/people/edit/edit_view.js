PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.PersonView = Backbone.Marionette.LayoutView.extend({
    template: "#person-form2",
    events: {
      "click button.js-submit": "submitClicked",
      "click button.js-cancel": "cancelClicked",
      "click #isAuthorisedLabel" : "isAuthorisedLabelClicked"
    },
    regions: {
      colourListRegion: "#colourListRegion"
    },
    onShow: function () {

    },
    ui: {
      isAuthorisedCheckbox: "#person-isAuthorised"
    },
    isAuthorisedLabelClicked:function(e) {
      event.preventDefault();
      this.ui.isAuthorisedCheckbox.toggle();
    }
    ,
    submitClicked: function (e) {
      e.preventDefault();
      var colourView = this.colourListRegion.currentView;
      var colourCollectionModel = colourView.collection;
      var data = Backbone.Syphon.serialize(this);
      data.colours = colourCollectionModel.toJSON();
      //colourCollectionModel.each(function(item, index) {
      //  console.log("name=" + item.get("name") + " = " + item.get("isChecked"));
      //});



      this.trigger("form:submit", data);
    },

    cancelClicked: function (e) {
      e.preventDefault();
      this.trigger("person:cancelEditing", this.model);
    }
  });


  Edit.ColourView = Marionette.ItemView.extend({
    template: "#colour-template",
    events: {
      "click input": "itemClicked"
    },

    ui: {
      tickbox: "input"
    },

    itemClicked: function (e) {
      this.model.set("isChecked", e.target.checked);
    }
  });

  Edit.ColoursView = Marionette.CollectionView.extend({
    tagName: "div",
    childView: Edit.ColourView
  });

  Edit.MissingPerson = Marionette.ItemView.extend({
    template: "#missing-person-view"
  });
});
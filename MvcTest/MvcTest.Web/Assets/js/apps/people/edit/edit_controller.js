PeopleManager.module("PeopleApp.Edit", function (Edit, PeopleManager, Backbone, Marionette, $, _) {
  Edit.Controller = {
    editPerson: function (id) {
      var loadingView = new PeopleManager.Common.Views.Loading();
      PeopleManager.regions.main.show(loadingView);

      var fetchingContact = PeopleManager.request("person:entity", id);
      $.when(fetchingContact).done(function (person) {
        var view;
        if (person !== undefined) {
          view = new Edit.Form({
            model: person
          });

          view.on("form:submit", function (data) {
            $.when(person.save(data)).done(function () {
              PeopleManager.trigger("people:list");
            });
          });

          view.on("person:cancelEditing", function () {
            PeopleManager.trigger("people:list");
          });

          view.on("show", function () {
            var rawColours = person.get("colours");
            var colours = PeopleManager.request("colour:entities", rawColours);
            var coloursView = new Edit.Colours({
              collection: colours
          });

            var region = view.getRegion("favouriteColours");
            region.show(coloursView);
          });

        } else {
          view = new PeopleManager.PeopleApp.Edit.MissingPerson();
        }


        PeopleManager.regions.main.show(view);
      });
    }
  };
});
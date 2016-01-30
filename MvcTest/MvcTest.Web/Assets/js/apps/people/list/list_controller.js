PeopleManager.module("PeopleApp.List", function (List, PeopleManager, Backbone, Marionette, $, _) {
  List.Controller = {
    listPeople: function () {
      //TODO
      var loadingView = new PeopleManager.Common.Views.Loading();
      PeopleManager.regions.main.show(loadingView);

      var fetchingPeople = PeopleManager.request("person:entities");

      var peopleListLayout = new List.Layout();

      $.when(fetchingPeople).done(function (people) {
        if (people.length > 0) {

          var peopleListView = new List.People({
            collection: people
          });

          peopleListLayout.on("show", function () {
            peopleListLayout.peopleListRegion.show(peopleListView);
          });

          PeopleManager.regions.main.show(peopleListLayout);
        } else {
          var noPeopleView = new List.NoPeopleView();
          PeopleManager.regions.main.show(noPeopleView);
        }
      });

      peopleListLayout.on("childview:person:edit", function (childView, args) {
        alert("list_controller-> Here should be an invocation of edit_controller");
      });

    }
  }
});
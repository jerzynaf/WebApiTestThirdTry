$(document).ready(function () {

  $("#isAuthorisedLabel").click(function (event) {
    alert("ok");
    event.preventDefault();
    $("#person-isAuthorised").toggle();
  });

  $("#isEnabledLabel").click(function (event) {
    alert("ok");
    event.preventDefault();
    $("person-isEnabled").toggle();
  });

});
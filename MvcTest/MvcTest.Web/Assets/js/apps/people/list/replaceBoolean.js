function yesNo(booleanValue) {
  var tempLabel = "<label class=";
  if (booleanValue === true) {
    tempLabel = tempLabel + "\"green\">Yes</label>";
    return tempLabel;
  } else {
    tempLabel = tempLabel + "\"red\">No</label>";
    return tempLabel;
  }
}
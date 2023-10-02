// variable default value = javascript: "" + gs.action.getGlideURI();
current.setValue("category", 500); // General  Inquiry
current.account = "0c42a37e87b4c1d05ea2b997cebb3555"; // Microsoft

// Getting category from url to set the assignement group
var url = "" + producer.portal_url;
var urlArr = url.split("&");

var catID = "";
for (var i = 0; i < urlArr.length; i++) {
  if (urlArr[i].includes("sysparm_category")) {
    catID = urlArr[i];
  }
}

var catIDArr = catID.split("=");
var portalCategory = new GlideRecord("sc_category");
portalCategory.get(catIDArr[1]);

var title = "" + portalCategory.title;

var grpID = "";
if (title == "Software") {
  grpID = "400566b787dd2550aaabda083cbb3540"; // Microsoft Software Support
} else {
  grpID = "c5e426b787dd2550aaabda083cbb3547"; // Microsoft Hardware Support
}

current.assignment_group = grpID;
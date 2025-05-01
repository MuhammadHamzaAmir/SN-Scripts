function onLoad() {
  //Type appropriate comment here, and begin script below
  var view = getView();
  var ga = new GlideAjax("MSPCategoriesV3");
  ga.addParam("sysparm_name", "getCategoriesV3");
  ga.addParam("sysparm_view", view);
  ga.addParam("sysparm_sys_id", g_form.getUniqueValue());
  ga.getXMLAnswer(ResponseParse);
}

// the callback function for returning the result from the server-side code
function ResponseParse(response) {
  var category = g_form.getValue("category");
  
  

  try {

    if (response !== null && response !== "null") {
      var json = JSON.parse(response);
      var remove = json["remove"];
      for (var i = 0; i < remove.length; i++) {
        g_form.removeOption("category", remove[i][0]);
      }
      var keep = json["keep"]; // keep/add
      for (var j = 0; j < keep.length; j++) {
        g_form.addOption("category", keep[j][0], keep[j][1]);
      }
    }
    var viewName = getView();

    if (
      viewName != "msp_view" &&
      viewName != "msp_major_incident" &&
      viewName != "msp_mi_view" &&
      viewName != "nterprise_default_view"
    ) {
      hdAndGasCategories();
    }
  } catch (e) {
    alert(e);
  }
}

function hdAndGasCategories() {
  var ga = new GlideAjax("userGroupInfo");
  ga.addParam("sysparm_name", "getGroups");
  ga.getXMLAnswer(isMemberOfGroup);

  function isMemberOfGroup(response) {
    var answer = response;
    //alert('Found >> '+answer);
    //answer = response.responseXML.documentElement.getAttribute('answer');
    //alert(answer);

    if (g_user.hasRoleExactly("admin")) {
      //alert('In first IF');
      return;
    } else if (answer == "true") {
      //alert(answer);

      

      g_form.removeOption("category", "imac", "IMAC");
      g_form.removeOption("category", "security", "Security");
      g_form.removeOption("category", "software", "Software");
      g_form.removeOption("category", "hardware", "Hardware");
      g_form.removeOption("category", "inquiry", "Inquiry / Help");
     
    } else {
      

      g_form.removeOption("category", "database", "Database");
      g_form.removeOption("category", "website", "Website");
      g_form.removeOption("category", "outlook", "Outlook");
      g_form.removeOption("category", "teams", "Teams");
     
    }
  }
}

function removeChoices(fieldName, choicesArray) {
  for (var i = 0; i < choicesArray.length; i++) {
    g_form.removeOption(fieldName, choicesArray[i]);
  }
}

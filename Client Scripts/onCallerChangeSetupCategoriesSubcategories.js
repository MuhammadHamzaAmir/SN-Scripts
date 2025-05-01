function onChange(control, oldValue, newValue, isLoading, isTemplate) {


  var viewName = getView();

  if (
    viewName == "msp_view" ||
    viewName == "msp_major_incident" ||
    viewName == "msp_mi_view"
  ) {
    if (newValue == "") {
      if (g_form.isNewRecord() && isLoading) {
        g_form.setMandatory("category", false);
        g_form.setMandatory("subcategory", false);

        g_form.setReadOnly("category", true);
        g_form.setReadOnly("subcategory", true);
        return;
      }
    } else {
      if (isLoading) {
        return;
      }
      g_form.setReadOnly("category", false);
      g_form.setReadOnly("subcategory", false);

      g_form.setMandatory("category", true);
      g_form.setMandatory("subcategory", true);

      var ga = new GlideAjax("MSPCategoriesV3");
      ga.addParam("sysparm_name", "getCategoriesV3");
      ga.addParam("sysparm_view", viewName);
      ga.addParam("sysparm_sys_id", g_form.getUniqueValue());
      ga.addParam("sysparm_user_id", newValue);
      ga.getXMLAnswer(responseParse);
    }
  }
}

function responseParse(response) {
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
}

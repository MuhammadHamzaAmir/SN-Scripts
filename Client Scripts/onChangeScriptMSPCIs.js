function onChange(control, oldValue, newValue, isLoading, isTemplate) {
  if (newValue === "") {
    return;
  }

  var gx = new GlideAjax("IncidentsMSPFunctionsClient");
  gx.addParam("sysparm_name", "showOrHideMSPCis");
  gx.addParam("sysparm_user_sys_id", newValue);
  gx.getXMLAnswer(callbackFunction);
}

function callbackFunction(response) {
  if (response !== null && response !== "null") {
    var json = JSON.parse(response);
    var remove = json["remove"];
    for (var i = 0; i < remove.length; i++) {
      g_form.removeOption("u_msp_cis", remove[i][0]);
    }
    var keep = json["keep"]; // keep/add
    for (var j = 0; j < keep.length; j++) {
      g_form.addOption("u_msp_cis", keep[j][0], keep[j][1]);
    }
  }
}

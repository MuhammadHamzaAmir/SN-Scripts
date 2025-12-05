function onSubmit() {
  if (g_scratchpad.isFormValid) {
    return true;
  }

  var assetUpdate = g_form.getValue("asset_update");

  if (assetUpdate === "bulk_update") {
    var fileSysID = g_form.getValue("bulk_assets");

    var gx = new GlideAjax("AssetClientUtils");
    gx.addParam("sysparm_name", "validateExcelHeaders");
    gx.addParam("sysparm_file_sys_id", fileSysID);
    gx.getXMLAnswer(callbackFunction);
    return false;
  }

  function callbackFunction(response) {
    var answer = response;

    if (answer == "false") {
      g_form.addErrorMessage(
        "The attached excel file is wrong. Please verify it with the given template"
      );

      return false;
    }

    var actionName = g_form.getActionName();
    g_scratchpad.isFormValid = true;
    g_form.submit(actionName);
  }
}

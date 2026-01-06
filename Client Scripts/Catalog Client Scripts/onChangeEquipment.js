function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue == "") {
    return;
  }

  var assetClientUtils = new GlideAjax("AssetClientUtils");
  assetClientUtils.addParam("sysparm_name", "getEquipmentDetails");
  assetClientUtils.addParam("sysparm_equipment_sys_id", newValue);
  assetClientUtils.getXMLAnswer(callbackFunction);

    function callbackFunction(response) {   
        var answer = response;
        if (!answer || answer === "{}") {
          return;
        }
        var equipDetails = JSON.parse(answer);
        g_form.setValue("asset_tag", equipDetails.asset_tag);
        g_form.setValue("serial_number", equipDetails.serial_number);
        g_form.setValue("assigned_to", equipDetails.assigned_to);
        g_form.setValue("active", equipDetails.active);
        g_form.setValue("name", equipDetails.name);
        g_form.setValue("type", equipDetails.type);
        g_form.setValue("managed_by", equipDetails.managed_by);
        g_form.setValue("state", equipDetails.state);
        g_form.setValue("substate", equipDetails.substate);
  }
}

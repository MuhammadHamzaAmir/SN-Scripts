var MSPAssetClientUtils = Class.create();
MSPAssetClientUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  validateExcelHeaders: function (fileSysID) {
    var fileExcelSysID = this.getParameter("sysparm_file_sys_id") || fileSysID;

    var parser = new sn_impex.GlideExcelParser();
    var attachment = new GlideSysAttachment();
    // use attachment sys id of an excel file
    var attachmentStream = attachment.getContentStream(fileExcelSysID);

    parser.parse(attachmentStream);

    //retrieve the column headers
    var headers = parser.getColumnHeaders();

    var expHeaders = [
      "asset tag",
      "configuration item",
      "department",
      "location",
      "comments",
      "type",
      "display name",
      "serial number",
      "model category",
      "assigned to",
      "manager",
      "installed",
      "assigned",
      "order received",
      "state",
      "substate",
      "model id",
    ];

    var res = true;
    if (headers.length !== expHeaders.length) {
      res = false;
      parser.close();
      return res;
    }

    for (var i = 0; i < headers.length; i++) {
      var head = headers[i].toLowerCase().trim();
      var expHead = expHeaders[i];
      if (head != expHead) {
        res = false;
        break;
      }
    }

    parser.close();

    return res;
  },

  getEquipmentDetails: function () {
    var equipSysID = this.getParameter("sysparm_equipment_sys_id");
    var equipmentGR = new GlideRecord("alm_hardware");
    if (equipmentGR.get(equipSysID)) {
      var details = {};
      details.asset_tag = equipmentGR.getValue("asset_tag");
      details.serial_number = equipmentGR.getValue("serial_number");
      details.assigned_to = equipmentGR.getValue("assigned_to");
      details.active = equipmentGR.getValue("u_active");
      details.name = equipmentGR.getValue("u_customer_name");
      details.type = equipmentGR.getValue("u_type");
      details.managed_by = equipmentGR.getValue("managed_by");
      details.state = equipmentGR.getValue("install_status");
      details.substate = equipmentGR.getValue("substatus");
      return JSON.stringify(details);
    }else{
      return "{}";
    }
  },

  type: "MSPAssetClientUtils",
});

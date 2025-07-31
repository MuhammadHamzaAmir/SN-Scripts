(function process(/*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
  var data = request.body.data;

  // Required fields validation
  var requiredFields = [
    "u_ritm_number",
    "u_order_number",
    "u_hardware_model",
    "u_serial_number",
  ];

  var missingFields = [];

  requiredFields.forEach(function (field) {
    if (!data[field] || data[field].toString().trim() === "") {
      missingFields.push(field);
    }
  });

  if (missingFields.length > 0) {
    var errorResponse = {
      error: "Validation failed. Fields are missing",
    };

    response.setStatus(405);
    response.setBody(errorResponse);
    return;
  }

  var ritmGr = new GlideRecord("sc_req_item");
  ritmGr.addQuery("number", data["u_ritm_number"]).addOrCondition("u_order_number", data["u_order_number"]);
  ritmGr.query();

  while (ritmGr.next()) {
    ritmGr.setValue("u_order_number", data["u_order_number"]);
    ritmGr.work_notes = "Order Number: " + data["u_order_number"];
    ritmGr.update();
  }

  //Get the Deployment, Config and Retrieval Tasks
  var taskGr = new GlideRecord("sc_task");
  taskGr.addEncodedQuery(
    "request_item.number=" +
      data["u_ritm_number"] +
      "^ORrequest_item.u_order_number=" +
      data["u_order_number"] +
      "^ORshort_descriptionLIKEdeployment^ORshort_descriptionLIKEconfig^ORshort_descriptionLIKEretrieval"
  );

  taskGr.query();

  var statusCode = 201;
  var statusMsg = "Success";
  var statusResult = "Success";
  var statusBody = {
    message: statusMsg,
  };
  while (taskGr.next()) {
    var taskShortDesc = taskGr.getValue("short_description");
    taskShortDesc = taskShortDesc.toLowerCase();

    var hardwareModel = data["u_hardware_model"].toLowerCase();

    if (
      (taskShortDesc.includes("deployment") ||
        taskShortDesc.includes("config")) &&
      !(
        hardwareModel.includes("return lable") ||
        hardwareModel.includes("return label")
      )
    ) {
      taskGr.setValue("u_serial_number", data["u_serial_number"]);
      taskGr.setValue("u_shipment_tracking", data["u_tracking_number"]);
      taskGr.setValue("u_carrier", data["u_carrier"]);
      taskGr.setValue("u_item_id", data["u_item_id"]);

      taskGr.work_notes =
        "Serial Number: " +
        data["u_serial_number"] +
        "\n" +
        "Shipment Tracking: " +
        data["u_tracking_number"] +
        "\n" +
        "Carrier: " +
        data["u_carrier"] +
        "\n" +
        "Item ID: " +
        data["u_item_id"] +
        "\n" +
        "Hardware Model: " +
        data["u_hardware_model"] +
        "\n" +
        "Requestor Name: " +
        data["u_requestor_name"] +
        "\n" +
        "Requestor Email: " +
        data["u_requestor_email"] +
        "\n" +
        "Manufacturer Name: " +
        data["u_mfg_name"] +
        "\n" +
        "Manufacturer Part Number: " +
        data["u_mfg_part_number"] +
        "\n" +
        "Ship Address: " +
        data["u_ship_address"] +
        "\n" +
        "Ship City: " +
        data["u_ship_city_h"] +
        "\n" +
        "Ship State: " +
        data["u_ship_state_h"] +
        "\n" +
        "Ship Date: " +
        data["u_ship_date"] +
        "\n" +
        "Shipping Status: " +
        data["u_shipping_status"] +
        "\n" +
        "Shipping Quantity: " +
        data["u_shipping_quantity"];
      taskGr.update();
      statusCode = 201;
      statusMsg = "Task is updated";
      statusResult = "Success";
      statusBody["status_result"] = statusResult;
      statusBody["task_number"] = taskGr.getValue("number");
      statusBody["task_state"] = taskGr.getDisplayValue("state");
      statusBody["task_short_description"] = taskGr.getValue("short_description");
      response.setStatus(statusCode);
      response.setBody(statusBody);
    } else if (
      taskShortDesc.includes("retrieval") &&
      (hardwareModel.includes("return lable") ||
        hardwareModel.includes("return label"))
    ) {
      taskGr.setValue("u_serial_number", data["u_serial_number"]);
      taskGr.setValue("u_shipment_tracking", data["u_tracking_number"]);
      taskGr.setValue("u_carrier", data["u_carrier"]);
      taskGr.setValue("u_item_id", data["u_item_id"]);

      taskGr.work_notes =
        "Serial Number: " +
        data["u_serial_number"] +
        "\n" +
        "Shipment Tracking: " +
        data["u_tracking_number"] +
        "\n" +
        "Carrier: " +
        data["u_carrier"] +
        "\n" +
        "Item ID: " +
        data["u_item_id"] +
        "\n" +
        "Hardware Model: " +
        data["u_hardware_model"] +
        "\n" +
        "Requestor Name: " +
        data["u_requestor_name"] +
        "\n" +
        "Requestor Email: " +
        data["u_requestor_email"] +
        "\n" +
        "Manufacturer Name: " +
        data["u_mfg_name"] +
        "\n" +
        "Manufacturer Part Number: " +
        data["u_mfg_part_number"] +
        "\n" +
        "Ship Address: " +
        data["u_ship_address"] +
        "\n" +
        "Ship City: " +
        data["u_ship_city_h"] +
        "\n" +
        "Ship State: " +
        data["u_ship_state_h"] +
        "\n" +
        "Ship Date: " +
        data["u_ship_date"] +
        "\n" +
        "Shipping Status: " +
        data["u_shipping_status"] +
        "\n" +
        "Shipping Quantity: " +
        data["u_shipping_quantity"];
      taskGr.update();
      statusCode = 201;
      statusMsg = "Task is updated";
      statusResult = "Success";
      statusBody["status_result"] = statusResult;
      statusBody["task_number"] = taskGr.getValue("number");
      statusBody["task_state"] = taskGr.getDisplayValue("state");
      statusBody["task_short_description"] = taskGr.getValue("short_description");
      response.setStatus(statusCode);
      response.setBody(statusBody);
    } else {
      statusCode = 404;
      statusMsg = "No Deployment, Config and Retrieval Tasks are found";
      statusResult = "Error";
      statusBody["status_result"] = statusResult;
      statusBody["task_number"] = taskGr.getValue("number");
      statusBody["task_state"] = taskGr.getDisplayValue("state");
      statusBody["task_short_description"] = taskGr.getValue("short_description");
      response.setStatus(statusCode);
      response.setBody(statusBody);
    }
  }
})(request, response);

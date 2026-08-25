(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var data = request.body.data;

    // Required fields validation
    var requiredFields = [
        "u_ritm_number",
        "u_order_number",
        "u_hardware_model",
        "u_serial_number",
        "u_model_category"
    ];

    var missingFields = [];

    requiredFields.forEach(function(field) {
        if (!data[field] || data[field].toString().trim() === "") {
            missingFields.push(field);
        }
    });

    if (missingFields.length > 0) {
        var errorResponse = {
            error: "Validation failed. Fields are missing: " + missingFields.join(", ")
        };

        response.setStatus(400);
        response.setBody(errorResponse);
        return;
    }

    var ritmGr = new GlideRecord("sc_req_item");
    ritmGr.addQuery("number", data["u_ritm_number"]);
    ritmGr.query();

    if (ritmGr.next()) {
        ritmGr.setValue("u_order_number", data["u_order_number"]);
        ritmGr.update();
    } else {
        var errorResponse = {
            message: "Error: RITM not found. Please check the RITM number.",
            status_result: "Error",
            task_number: "",
            task_state: "",
            task_short_description: "",
        };
        response.setStatus(404);
        response.setBody(errorResponse);
        return;
    }

    var hardwareModel = data["u_hardware_model"].toLowerCase();
    var statusCode = 201;
    var statusMsg = "";
    var statusResult = "";
    var statusBody = {
        message: statusMsg,
    };

    //Deployment Tasks
    //If the hardware model does not include "return label" or "return lable",
    if (!(hardwareModel.includes("return lable") || hardwareModel.includes("return label"))) {

        
        
        var substitute = isHardwareSubstitutedAllowed(data["u_model_category"]);

        //update deploy task
        var taskGr = new GlideRecord("sc_task");
        taskGr.addEncodedQuery(
          "request_item.number=" +
            data["u_ritm_number"] +
            "^request_item.u_order_number=" +
            data["u_order_number"] +
            "^u_deployment_task=true",
        );

        taskGr.query();
        if (taskGr.next()) {
            
            taskGr.setValue("u_serial_number", data["u_serial_number"]);
            taskGr.setValue("u_shipment_tracking", data["u_tracking_number"]);
            taskGr.setValue("u_carrier", data["u_carrier"]);
            taskGr.setValue("u_item_id", data["u_item_id"]);
            taskGr.setValue("u_ship_date", data["u_ship_date"]);


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

            
            if (substitute) {
                var subResult = hardwareSubstitute(taskGr.sys_id, data["u_serial_number"]);
                if (subResult) {
                    taskGr.u_deployment_task = false;  // Mark the task as not a deployment task after successful substitution becuase we don't want to execute the Business Rule "Deploy an Reserved Asset" which is triggered after the task and reserve the old asset.
                    taskGr.update();

                    taskGr.setValue("state", "3"); // Closed Complete
                    taskGr.update();
                }
            }



            statusCode = 201;
            statusMsg =  "Deploy Task is updated";
            statusResult = "Success";
            statusBody["status_result"] = statusResult;
            statusBody["message"] = statusMsg;
            statusBody["task_number"] =  taskGr.getValue("number");
            statusBody["task_state"] =  taskGr.getDisplayValue("state");
            statusBody["task_short_description"] = taskGr.getValue("short_description");
            response.setStatus(statusCode);
            response.setBody(statusBody);
            return;
        } else {
            
            statusCode = 404;
            statusMsg = "Error: Deploy Task not found. Please check the RITM number and set the Asset Action Type to Deploy in the task.";
            statusResult = "Error";
            statusBody["status_result"] = statusResult;
            statusBody["message"] = statusMsg;
            statusBody["task_number"] = "";
            statusBody["task_state"] = "";
            statusBody["task_short_description"] = "";
            response.setStatus(statusCode);
            response.setBody(statusBody);
            return;
        }
    } else if (hardwareModel.includes("return lable") || hardwareModel.includes("return label")) {

        //Update Retrieval Tasks
        var taskGr = new GlideRecord("sc_task");
        taskGr.addEncodedQuery(
          "request_item.number=" +
            data["u_ritm_number"] +
            "^request_item.u_order_number=" +
            data["u_order_number"] +
            "^u_retrieval_task=true",
        );

        taskGr.query();
        if (taskGr.next()) {
            taskGr.setValue("u_serial_number", data["u_serial_number"]);
            taskGr.setValue("u_shipment_tracking", data["u_tracking_number"]);
            taskGr.setValue("u_carrier", data["u_carrier"]);
            taskGr.setValue("u_item_id", data["u_item_id"]);
            taskGr.setValue("u_ship_date", data["u_ship_date"]);


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
            taskGr.setValue("state", "9"); //Awaiting User Info
            taskGr.update();
            statusCode = 201;
            statusMsg = "Retrieve Task is updated";
            statusResult = "Success";
            statusBody["status_result"] = statusResult;
            statusBody["message"] = statusMsg;
            statusBody["task_number"] = taskGr.getValue("number");
            statusBody["task_state"] = taskGr.getDisplayValue("state");
            statusBody["task_short_description"] = taskGr.getValue("short_description");
            response.setStatus(statusCode);
            response.setBody(statusBody);
            return;
        } else {
            statusCode = 404;
            statusMsg = "Error: Retrieve Task not found. Please check the RITM number and set the Asset Action Type to Retrieve in the task.";
            statusResult = "Error";
            statusBody["status_result"] = statusResult;
            statusBody["message"] = statusMsg;
            statusBody["task_number"] = "";
            statusBody["task_state"] = "";
            statusBody["task_short_description"] = "";
            response.setStatus(statusCode);
            response.setBody(statusBody);
            return;
        }
    }



})(request, response);

function hardwareSubstitute(scTaskSysID, newAssetSerialNum) {

    var scTaskGr = new GlideRecord("sc_task");
    scTaskGr.get(scTaskSysID);

    var hardSubUtil = new HardwareSubstituteUtil();

    var stockRoom = scTaskGr.u_sourced_to_stockroom;
    var newModel = scTaskGr.request_item.cat_item.model;

	var stockRoomDispValue = scTaskGr.getDisplayValue("u_sourced_to_stockroom");
	var oldAsset = scTaskGr.getDisplayValue("u_asset");
    var oldAssetSysID = scTaskGr.u_asset;
	var oldAssetSerialNum = scTaskGr.u_asset_serial_number;

    var assets = hardSubUtil.getAvailableAssetsBySerialNum(stockRoom, newAssetSerialNum);
    if (assets && assets.length > 0) {
		
        hardSubUtil.substituteHardware(scTaskSysID, assets[0], newModel);
        var newAssetGr = new GlideRecord("alm_asset");
        newAssetGr.get(assets[0]);

        var oldAssetGr = new GlideRecord("alm_asset");
        oldAssetGr.get(oldAssetSysID);

        scTaskGr.work_notes = "Old Asset: " + oldAsset + " (Serial Number: " + oldAssetSerialNum + ") is Substituted with a New Asset: " + newAssetGr.display_name + " (Serial Number: " + newAssetSerialNum + ") from the Stockroom: " + stockRoomDispValue;
        scTaskGr.update();

        scTaskGr.work_notes = "After Hardware Substitution \n\nOld Asset \nState: " + oldAssetGr.install_status.getDisplayValue() + "\nSubstate: " + oldAssetGr.substatus.getDisplayValue() + " \nReserved for: " + oldAssetGr.reserved_for.getDisplayValue() + "\nAssigned To: " + oldAssetGr.assigned_to.getDisplayValue() + "\n \n New Asset \nState: " + newAssetGr.install_status.getDisplayValue() + "\nSubstate: " + newAssetGr.substatus.getDisplayValue() + " \nReserved for: " + newAssetGr.reserved_for.getDisplayValue() + "\nAssigned To: " + newAssetGr.assigned_to.getDisplayValue();
        scTaskGr.update();

        scTaskGr.work_notes = "Hardware Substitution is completed successfully.";
        scTaskGr.update();

        return true;
    } else {
        scTaskGr.work_notes = "No asset with Serial Number: "+newAssetSerialNum+" is available in the stockroom: "+ stockRoomDispValue;
        scTaskGr.update();
        return false;
    }



}

function isHardwareSubstitutedAllowed(modelCategory) {
    modelCategory = modelCategory.toLowerCase();
    // allow singular and plural bothes
    var allowedCategories = ["laptops", "monitors", "printers", "laptop", "monitor", "printer"];
    return allowedCategories.includes(modelCategory);
}
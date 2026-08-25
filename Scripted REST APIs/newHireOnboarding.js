(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {
    var data = request.body.data;





    // Required fields validation
    var requiredFields = [
        "u_ritm_number",
        "u_order_number",
    ];

    var missingFields = [];

    for (var i = 0; i < requiredFields.length; i++) {
        var field = requiredFields[i];
        if (!data.hasOwnProperty(field) || data[field] === null || data[field] === "") {
            missingFields.push(field);
        }
    }


    if (missingFields.length > 0) {
        var errorResponse = {
            error: "Validation failed. Fields are missing",
        };

        response.setStatus(405);
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
            message: "Error: RITM not found",
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

    //We'll only check for one task and if it exists, we'll update it. If it doesn't exist, we'll return an error message.

    //update the task
    var taskGr = new GlideRecord("sc_task");
    taskGr.addEncodedQuery(
        "request_item.number=" +
        data["u_ritm_number"] +
        "^request_item.u_order_number=" +
        data["u_order_number"]
    );
    
    taskGr.query();


    if (taskGr.next()) {
        var laptopFound = true;
        var monitorFound = true;
        
        var orderLines = data["order_lines"];
        var stockRoom = taskGr.u_sourced_to_stockroom || gs.getProperty("clifton_park_depot_stockroom"); 


        for (var i = 0; i < orderLines.length; i++) {
            var orderLine = orderLines[i];
            var modelCategory = orderLine["u_model_category"];

            if (modelCategory.toLowerCase() === "laptop" || modelCategory.toLowerCase() === "laptops") {
                var newAssetGr = findAssetBySerialNumber(orderLine["u_serial_number"], stockRoom);
                if (newAssetGr) {
                    taskGr.u_asset = newAssetGr.sys_id;
                    taskGr.u_asset_tag = newAssetGr.asset_tag;
                    taskGr.u_asset_serial_number = newAssetGr.serial_number;
                    if (orderLine["u_asset_tag"]) {
                        updateAssetTag(newAssetGr.sys_id, orderLine["u_asset_tag"]);
                    }
                    updateAssetState(newAssetGr.sys_id, 1); // 1 = In Use
                    updateAssetReservation(newAssetGr.sys_id, taskGr.request_item.sys_id, taskGr.request.u_contractor);
                    
                }
                else{
                    // If no asset is found, update the work notes to indicate that the asset was not found
                    var workNotes = "No Laptop asset found for the following details: \n";
                    workNotes += "Product Name: " + orderLine["u_product_name"] + "\n";
                    workNotes += "Serial Number: " + orderLine["u_serial_number"] + "\n";
                    taskGr.work_notes = workNotes;
                    laptopFound = false;
                }
                
            }
            else if (modelCategory.toLowerCase() === "monitor" || modelCategory.toLowerCase() === "monitors") {
                var newAssetGr = findAssetBySerialNumber(orderLine["u_serial_number"], stockRoom);
                if (newAssetGr) {
                    taskGr.u_display_monitor = newAssetGr.sys_id;  
                    if (orderLine["u_asset_tag"]) {
                        updateAssetTag(newAssetGr.sys_id, orderLine["u_asset_tag"]);
                    }
                    updateAssetState(newAssetGr.sys_id, 1); // 1 = In Use
                    updateAssetReservation(newAssetGr.sys_id, taskGr.request_item.sys_id, taskGr.request.u_contractor);
                }
                else{
                    // If no asset is found, update the work notes to indicate that the asset was not found
                    var workNotes = "No Monitor asset found for the following details: \n";
                    workNotes += "Product Name: " + orderLine["u_product_name"] + "\n";
                    workNotes += "Serial Number: " + orderLine["u_serial_number"] + "\n";
                    taskGr.work_notes = workNotes;
                    monitorFound = false;
                }
            }
            else{
                // Handle consumables
                var taskConsumables = taskGr.getValue("u_consumables"); 
                var consumableAssetGr = findConsumableByProductNameandStockroom(orderLine["u_product_name"], stockRoom);
                if (consumableAssetGr) {
                    // check if there is already a consumable in the field, if so, append to it, otherwise set it
                    if (taskConsumables) {
                        taskGr.u_consumables = taskConsumables + ", " + consumableAssetGr.sys_id;
                    } else {
                        taskGr.u_consumables = consumableAssetGr.sys_id;
                    }
                    
                }
                else{
                    // If no consumable is found, update the work notes to indicate that the consumable was not found
                    var workNotes = "No Consumable asset found for the following details: \n";
                    workNotes += "Product Name: " + orderLine["u_product_name"] + "\n";
                    taskGr.work_notes = workNotes;
                }
            }
            

            var workNotes = "Asset information for " + modelCategory + ": \n";
            workNotes += "Asset Tag: " + orderLine["u_asset_tag"] + "\n";
            workNotes += "Serial Number: " + orderLine["u_serial_number"] + "\n";
            workNotes += "Carrier: " + orderLine["u_carrier"] + "\n";
            workNotes += "Tracking Number: " + orderLine["u_tracking_number"] + "\n";
            workNotes += "Ship Date: " + orderLine["u_ship_date"] + "\n";
            workNotes += "Shipping Quantity: " + orderLine["u_shipping_quantity"] + "\n";
            workNotes += "Ship Address: " + orderLine["u_ship_address"] + "\n";
            workNotes += "Ship City: " + orderLine["u_ship_city_h"] + "\n";
            workNotes += "Ship State: " + orderLine["u_ship_state_h"] + "\n";
            workNotes += "Manufacturer: " + orderLine["u_mfg_name"] + "\n";
            workNotes += "Manufacturer Part Number: " + orderLine["u_mfg_part_number"] + "\n";
            workNotes += "Product Name: " + orderLine["u_product_name"] + "\n";
            workNotes += "Model Category: " + orderLine["u_model_category"] + "\n";

            taskGr.work_notes = workNotes;
            taskGr.update();

            if (laptopFound && monitorFound) {
              taskGr.setValue("state", "3"); // Closed Complete
              taskGr.update();
            }

        }
       


        statusCode = 201;
        statusMsg = statusMsg + "," + "New Hire Onboarding Task is updated";
        statusResult = "Success";
        statusBody["status_result"] = statusResult;
        statusBody["message"] = statusMsg;
        statusBody["task_number"] = taskGr.getValue("number");
        statusBody["task_state"] = taskGr.getDisplayValue("state");
        statusBody["task_short_description"] =  taskGr.getValue("short_description");
        response.setStatus(statusCode);
        response.setBody(statusBody);
        return;
    } else {
        statusCode = 404;
        statusMsg = "Error: New Hire Onboarding Task not found";
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
    
    



})(request, response);


function findAssetBySerialNumber(serialNumber, stockRoom) {
    var assetGr = new GlideRecord("alm_asset");
    assetGr.addQuery("install_status=6^substatus=available");
    assetGr.addQuery("stockroom", stockRoom);
    assetGr.addQuery("serial_number", serialNumber);
    assetGr.query();
    if (assetGr.next()) {
        return assetGr;
    }
    return null;
}

function updateAssetTag(assetSysID, newAssetTag) {
    var assetGr = new GlideRecord("alm_asset");
    assetGr.get(assetSysID);
    assetGr.asset_tag = newAssetTag;
    assetGr.update();
}

function updateAssetState(assetSysID, newState) {
    var assetGr = new GlideRecord("alm_asset");
    assetGr.get(assetSysID);
    assetGr.install_status = newState;
    assetGr.update();
}

function updateAssetReservation(assetSysID, ritmSysID, rfor) {
    var assetGr = new GlideRecord("alm_asset");
    assetGr.get(assetSysID);
    assetGr.request_line = ritmSysID;
    assetGr.reserved_for = rfor;
    assetGr.assigned_to = rfor;
    assetGr.u_function = "Dedicated Device";
    assetGr.update();
}

function findConsumableByProductNameandStockroom(productName, stockRoom) {
    var assetGr = new GlideRecord("alm_consumable");
    assetGr.addQuery("substatus=available");
    assetGr.addQuery("stockroom", stockRoom);
    assetGr.addQuery("display_name", productName);
    assetGr.query();   
    if (assetGr.next()) {
        return assetGr;
    }
    return null; 
}
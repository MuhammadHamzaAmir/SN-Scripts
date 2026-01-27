var AssetUtils = Class.create();
AssetUtils.prototype = {
    initialize: function() {},

    insertDataToAssets: function(attachmentSysID) {
        var parser = new sn_impex.GlideExcelParser();

        var attachment = new GlideSysAttachment();

        var attachmentStream = attachment.getContentStream(attachmentSysID);
        1

        parser.setSource(attachmentStream);

        var sheetName = parser.getSheetNames();

        var ritmComments = "";
        var ritmNotes = "";

        var stateMapping = {
            build: "11",
            consumed: "10",
            in_maintenance: "3",
            in_stock: "6",
            in_transit: "9",
            in_use: "1",
            missing: "8",
            on_order: "2",
            retired: "7",
        };

        // Only using the First Sheet
        for (var i = 0; i < 1; i++) {
            parser.setSheetName(sheetName[i]);

            if (parser.parse()) {
                //retrieve the column headers
                var headers = parser.getColumnHeaders();

                // Iterate over each row in the worksheet
                var rowNum = 1;
                while (parser.next()) {
                    var row = parser.getRow();
                    rowNum++;

                    //Asset tag	Configuration Item	Department	Location	Comments	Type	Display name	Serial number	Model category	Assigned to	Installed	Assigned	Order received	State	SubState Model ID

                    var serialNum = row["Serial number"];
                    var assetTag = row["Asset tag"];
                    var congItem = row["Configuration Item"]; // Reference to cmdb_ci
                    var dept = row["Department"]; // Reference to cmn_department
                    var location = row["Location"]; // Reference to cmn_location
                    var comments = row["Comments"];
                    var type = row["Type"];
                    var displayName = row["Display name"];
                    var modelCategory = row["Model category"]; // Reference to cmdb_model_category
                    var assignedTo = row["Assigned to"]; // Reference to sys_user (it contains email)
                    var installed = row["Installed"];
                    var assigned = row["Assigned"];
                    var orderReceived = row["Order received"];
                    var state = row["State"];
                    var substate = row["Substate"];
                    var modelID = row["Model ID"];

                    ritmComments += "<b>Row " + rowNum + ":</b><br/>";

                    if (!serialNum || serialNum.trim() == "") {
                        ritmComments +=
                            "Row " + rowNum + ": Serial number is missing.<br/><br/>";
                        continue;
                    }

                    var ciExist = false;
                    var assetInsert = false;
                    var ciProvided = false;

                    var assetGr = new GlideRecord("alm_hardware");
                    assetGr.addQuery("serial_number", serialNum);
                    assetGr.query();
                    if (assetGr.next()) {
                        assetInsert = false;
                        if (assetTag) {
                            assetGr.asset_tag = assetTag;
                        }
                        if (congItem) {
                            ciProvided = true;
                            var cmdbGr = new GlideRecord("cmdb_ci");
                            cmdbGr.addQuery("name", congItem);
                            cmdbGr.query();
                            if (cmdbGr.next()) {
                                assetGr.ci = cmdbGr.sys_id;
                                ciExist = true;
                            } else {
                                ciExist = false;
                            }
                        } else {
                            ciProvided = false;
                            ciExist = false;
                            assetGr.ci = "";
                        }
                        if (dept) {
                            var deptGr = new GlideRecord("cmn_department");
                            deptGr.addQuery("name", dept);
                            deptGr.query();
                            if (deptGr.next()) {
                                assetGr.department = deptGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Department '" +
                                    dept +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.department = "";
                        }
                        if (location) {
                            var locGr = new GlideRecord("cmn_location");
                            locGr.addQuery("name", location);
                            locGr.query();
                            if (locGr.next()) {
                                assetGr.location = locGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Location '" +
                                    location +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.location = "";
                        }
                        if (comments) {
                            assetGr.comments = comments;
                        }
                        if (type) {
                            assetGr.u_msp_type = type;
                        }
                        if (modelCategory) {
                            var modelCatGr = new GlideRecord("cmdb_model_category");
                            modelCatGr.addQuery("name", modelCategory);
                            modelCatGr.addEncodedQuery(
                                "nameINApple Device,Computer,Computer Cart,Credit Card Machine,IP Phone,Laptop,Printer,Scanner,Tablet,^asset_class!=NULL^cmdb_ci_classISNOTEMPTY"
                            );
                            modelCatGr.query();
                            if (modelCatGr.next()) {
                                assetGr.model_category = modelCatGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Model Category '" +
                                    modelCategory +
                                    "' not found.<br/>";
                            }
                        }
                        if (assignedTo) {
                            var userGr = new GlideRecord("sys_user");
                            userGr.addQuery("email", assignedTo);
                            userGr.query();
                            if (userGr.next()) {
                                assetGr.assigned_to = userGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Assigned to user with email '" +
                                    assignedTo +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.assigned_to = "";
                        }
                        if (installed) {
                            assetGr.install_date = installed;
                        }
                        if (assigned) {
                            assetGr.assigned = assigned;
                        }
                        if (orderReceived) {
                            assetGr.delivery_date = orderReceived;
                        }
                        if (state) {
                            assetGr.install_status = stateMapping[state];
                        }
                        if (substate) {
                            assetGr.substatus = substate;
                        }
                        if (modelID) {
                            var modelGr = new GlideRecord("cmdb_model");
                            modelGr.addQuery("display_name", modelID);
                            modelGr.query();
                            if (modelGr.next()) {
                                assetGr.model = modelGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Model ID '" +
                                    modelID +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.model = "";
                        }
                        assetGr.update();

                        ritmComments +=
                            "Row " +
                            rowNum +
                            ": Asset with serial number " +
                            serialNum +
                            " is updated.<br/><br/>";
                    } else {
                        assetInsert = true;
                        assetGr = new GlideRecord("alm_hardware");
                        assetGr.initialize();
                        assetGr.serial_number = serialNum;
                        if (assetTag) {
                            assetGr.asset_tag = assetTag;
                        }
                        if (congItem) {
                            ciProvided = true;
                            var cmdbGr = new GlideRecord("cmdb_ci");
                            cmdbGr.addQuery("name", congItem);
                            cmdbGr.query();
                            if (cmdbGr.next()) {
                                assetGr.ci = cmdbGr.sys_id;
                                ciExist = true;
                            } else {
                                ciExist = false;
                            }
                        } else {
                            ciExist = false;
                            ciProvided = false;
                            assetGr.ci = "";
                        }
                        if (dept) {
                            var deptGr = new GlideRecord("cmn_department");
                            deptGr.addQuery("name", dept);
                            deptGr.query();
                            if (deptGr.next()) {
                                assetGr.department = deptGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Department '" +
                                    dept +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.department = "";
                        }
                        if (location) {
                            var locGr = new GlideRecord("cmn_location");
                            locGr.addQuery("name", location);
                            locGr.query();
                            if (locGr.next()) {
                                assetGr.location = locGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Location '" +
                                    location +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.location = "";
                        }
                        if (comments) {
                            assetGr.comments = comments;
                        }
                        if (type) {
                            assetGr.u_msp_type = type;
                        }
                        if (modelCategory) {
                            var modelCatGr = new GlideRecord("cmdb_model_category");
                            modelCatGr.addQuery("name", modelCategory);
                            modelCatGr.addEncodedQuery(
                                "nameINApple Device,Computer,Computer Cart,Credit Card Machine,IP Phone,Laptop,Printer,Scanner,Tablet,^asset_class!=NULL^cmdb_ci_classISNOTEMPTY"
                            );
                            modelCatGr.query();
                            if (modelCatGr.next()) {
                                assetGr.model_category = modelCatGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Model Category '" +
                                    modelCategory +
                                    "' not found.<br/>";
                            }
                        }
                        if (assignedTo) {
                            var userGr = new GlideRecord("sys_user");
                            userGr.addQuery("email", assignedTo);
                            userGr.query();
                            if (userGr.next()) {
                                assetGr.assigned_to = userGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Assigned to user with email '" +
                                    assignedTo +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.assigned_to = "";
                        }
                        if (installed) {
                            assetGr.install_date = installed;
                        }
                        if (assigned) {
                            assetGr.assigned = assigned;
                        }
                        if (orderReceived) {
                            assetGr.delivery_date = orderReceived;
                        }
                        if (state) {
                            assetGr.install_status = stateMapping[state];
                        }
                        if (substate) {
                            assetGr.substatus = substate;
                        }
                        if (modelID) {
                            var modelGr = new GlideRecord("cmdb_model");
                            modelGr.addQuery("display_name", modelID);
                            modelGr.query();
                            if (modelGr.next()) {
                                assetGr.model = modelGr.sys_id;
                            } else {
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Model ID '" +
                                    modelID +
                                    "' not found.<br/>";
                            }
                        } else {
                            assetGr.model = "";
                        }
                        assetGr.company = "1211331efbb8fa108f86fe838eefdc2d";
                        assetGr.u_msp_company = "1211331efbb8fa108f86fe838eefdc2d";
                        assetGr.insert();

                        var assetSysID = assetGr.getValue("sys_id");
                        var assetGrUpdate = new GlideRecord("alm_hardware");
                        if (assetGrUpdate.get(assetSysID)) {
                            assetGrUpdate.u_msp_company = "1211331efbb8fa108f86fe838eefdc2d";
                            assetGrUpdate.update();
                        }

                        ritmComments +=
                            "Row " +
                            rowNum +
                            ": Asset with serial number " +
                            serialNum +
                            " is created.<br/><br/>";
                    }

                    // check for the CI
                    if (assetInsert && ciProvided && (!(ciExist))) { // Asset is created
                        // ServiceNow Business Rule 'Create CI on Insert' will take care of this
                        // BR creates CI from Asset if CI is not provided during Asset creation and set the CI field in Asset
                        // Needs to set the Name in the CI from the provided in the sheet
                        // Need to confirm if the CI is created or not
                        gs.sleep(1000); // Sleep for 1 second to allow BR to complete
                        if ((assetGr.getValue("ci") != null) && (assetGr.getValue("ci") != "") && (assetGr.getValue("ci") != "null")) {
                            var ciGrCheck = new GlideRecord("cmdb_ci");
                            if (ciGrCheck.get(assetGr.getValue("ci"))) {
                                ciGrCheck.name = congItem;
                                ciGrCheck.update();
                                ritmComments +=
                                    "Row " +
                                    rowNum +
                                    ": Asset with serial number " +
                                    serialNum +
                                    " has created CI '" +
                                    ciGrCheck.getValue("name") +
                                    "'.<br/><br/>";
                            }
                        } else { // CI is not created by the BR
                            var ciClass = assetGr.model_category.cmdb_ci_class.toString();
                            var ci = new GlideRecord(ciClass);
                            ci.initialize();
                            ci.asset = assetGr.sys_id;
                            ci.manufacturer = assetGr.model.manufacturer;
                            ci.serial_number = assetGr.serial_number;
                            ci.name = congItem;
                            ci.model_id = assetGr.model;
                            ci.asset_tag = assetGr.asset_tag;
                            ci.company = assetGr.company;
                            ci.insert();

                            assetGr.ci = ci.sys_id;
                            assetGr.update();
                            ritmComments +=
                                "Row " +
                                rowNum +
                                ": Asset with serial number " +
                                serialNum +
                                " has created CI '" +
                                ciGrCheck.getValue("name") +
                                "'.<br/><br/>";
                        }

                    } else if ((!(assetInsert)) && (ciProvided) && (!(ciExist))) { // Asset is Updated
                        var ciClass = assetGr.model_category.cmdb_ci_class.toString();
                        var ci = new GlideRecord(ciClass);
                        ci.initialize();
                        ci.asset = assetGr.sys_id;
                        ci.manufacturer = assetGr.model.manufacturer;
                        ci.serial_number = assetGr.serial_number;
                        ci.name = congItem;
                        ci.model_id = assetGr.model;
                        ci.asset_tag = assetGr.asset_tag;
                        ci.company = assetGr.company;
                        ci.insert();

                        assetGr.ci = ci.sys_id;
                        assetGr.update();
                        ritmComments +=
                            ritmComments +=
                            "Row " +
                            rowNum +
                            ": Asset with serial number " +
                            serialNum +
                            " has created CI '" +
                            ciGrCheck.getValue("name") +
                            "'.<br/><br/>";

                    }

                } // end of while loop



            } else {
                gs.info(parser.getErrorMessage());
                ritmNotes +=
                    "Error parsing the Excel file.<br/>" + parser.getErrorMessage() + "";
            }



            parser.close();
            return {
                comments: ritmComments + "",
                notes: ritmNotes,
            };
        }
    },

    type: "AssetUtils",
};
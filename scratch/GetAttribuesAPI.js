// getting teh Attributes from the undocumented API
// var ca = new GlideColumnAttributes("incident");
// for (var member in ca) gs.print(member);
// var ca = new GlideTableCreator("test", "test");
// for (var member in ca) gs.print(member);

// *** Script: 40 Specification Option - Parent
// *** Script: 30 Specs - Refrence of Created Tables
// *** Script: 10 Main Tables

// var obj = {
//     "Main Tables": "10",
//     "Specs - Refrence of Created Tables": "30",
//     "Specification Option - Parent": "40",

// }

// var item = "X Hamza 3";
// // assign a number to the item based upon the obj in alphabetical order
// var itemNumber = 0;
// for (var member in obj) {
//     if (member < item) {
//         itemNumber += parseInt(obj[member]);
//     }
// }
// var nextNumber = 0;
// // find the next number in the obj which is greater than the itemNumber
// for (var member in obj) {
//     if (parseInt(obj[member]) > itemNumber) {
//         nextNumber = parseInt(obj[member]);
//         break;
//     }
// }

// console.log(itemNumber);
// console.log(nextNumber);

// // mid point between the two numbers
// var midPoint = Math.round((itemNumber + nextNumber) / 2);
// console.log(midPoint);

// var tableName = "x_889851_test_hamz_p4";
// var tableLabel = "P Hamza 4";

// var table_sys_id_gr = new GlideRecord("sys_db_object");
// table_sys_id_gr.addEncodedQuery("sys_update_nameISNOTEMPTY^sys_scope=2fbbfeec07a46110ab46f1d08c1ed0d2^super_class=6fbbfeec07a46110ab46f1d08c1ed0d2^name="+tableName+"^label="+tableLabel);
// table_sys_id_gr.query();
// table_sys_id_gr.next();
// var cr_tb_sys_id = table_sys_id_gr.getUniqueValue();

// // gs.info(cr_tb_sys_id);

// var dic_gr_specs = new GlideRecord("sys_dictionary");
// dic_gr_specs.newRecord();
// var dic_gr_specs_id = dic_gr_specs.getUniqueValue();
// dic_gr_specs.setValue("name","x_889851_test_hamz_specs_refrence_of_created_table");
// // dic_gr_specs.setValue("internal_type","52a227c1bf3320001875647fcf07396a");
// dic_gr_specs.internal_type="52a227c1bf3320001875647fcf07396a";

// dic_gr_specs.setValue("columnn_label", tableLabel);
// dic_gr_specs.setValue("element",tableName);

// // dic_gr_specs.setValue("reference",cr_tb_sys_id);
// dic_gr_specs.reference = cr_tb_sys_id;

// dic_gr_specs.setValue("attributes","ref_ac_columns=c_code;v_code,ref_ac_columns_search=true,ref_auto_completer=AJAXTableCompleter");
// dic_gr_specs.insert();

// dic_gr_specs = new GlideRecord("sys_dictionary");
// dic_gr_specs.get("a11184090768a110ab46f1d08c1ed037");

// var obj = {
//     "C Hamza 1": "5",
//     "Main Tables": "10",
//     "Specs - Refrence of Created Tables": "30",
//     "Specification Option - Parent": "40",
//     "X Hamza 4" : "50",
//     "X Hamza 5" : "60",
// }
// var new_item = "X Hamza 3";
// // assign a number to to the new_item based upon the ordering in the obj and make sure that strings are in alphabetical asending order
// var new_item_number = 0;

// var namePrefix = "x_889851_test_hamz";
// var tableLabel = "P Hamza (FPC2093)";
// var tableName = namePrefix;
// // only put FPC<number> in the table name if it is in the table label
// if (tableLabel.indexOf("FPC") > -1) {
//     // get the FPC number from the table label
//     var fpcNumber = tableLabel.match(/FPC\d+/)[0];
//     // add the FPC number to the table name
//     tableName += "_" + fpcNumber;
// }
// tableName = tableName.toLowerCase();

// // // remove the consecutive underscores
// // tableName = tableName.replace(/_+/g, "_");
// // // remove the underscore at the end
// // tableName = tableName.replace(/_$/, "");

// console.log(tableName);

// var tableLabel = "P Hamza (FPC2093)";
// var codeCheck = tableLabel.indexOf("FPC") > -1;

// // check if the table label contains FPC
// if (codeCheck) {
//     // get the FPC number from the table label
//     var fpcNumber = tableLabel.match(/FPC\d+/)[0].toLowerCase();
//     console.log(fpcNumber);
// }
// var tableLabelWOBrackets = "";
// var tableLabel = "P Hamza (FPC2093) ";
// // check if the table label contains brackets
// if (tableLabel.indexOf("(") > -1 || tableLabel.indexOf(")") > -1) {
//   // remove the brackets
//   tableLabelWOBrackets = tableLabel.replace(/[()]/g, "").trim();
// } else {
//   tableLabelWOBrackets = tableLabel;
// }

// console.log(tableLabelWOBrackets);

// var tableLabelWOBrackets = "";
// var tableLabel = " P Hamza    ";
// tableLabelWOBrackets = tableLabel.trim().replace(" ","_").toLowerCase();
// console.log(tableLabelWOBrackets);

// var queryTable = "";
// if (codeCheck){
//     queryTable = fpcNumber;
// }else{
//     queryTable = tableLabelWOBrackets;
// }
// // change the above to a ternary operator
// var queryTable = codeCheck ? fpcNumber : tableLabelWOBrackets;

// var tableLabel = "X Hamza without family";
// var namePrefix = "x_889851_test_hamz";

// // underscore the table label
// var tableName = tableLabel.replace(/ /g, "_").toLowerCase();
// // remove the consecutive underscores
// tableName = tableName.replace(/_+/g, "_");
// // remove the underscore at the end
// tableName = tableName.replace(/_$/, "");
// // put the underscore at the start
// tableName = "_" + tableName;
// // add the name prefix
// tableName = namePrefix + tableName;
// console.log(tableName);

// var tableLabel = "X Hamza again a";
// var tableNameWOBrackets = "";
// // underscore the table label
// tableNameWOBrackets = tableLabel.replace(/ /g, "_").toLowerCase();
// // remove the consecutive underscores
// tableNameWOBrackets = tableNameWOBrackets.replace(/_+/g, "_");
// // remove the underscore at the end
// tableNameWOBrackets = tableNameWOBrackets.replace(/_$/, "");
// console.log(tableNameWOBrackets);

// var colObjCode = {
//   1: "code,Code",
//   2: "description,Description",
// };

// // remove the last element from the object
// delete colObjCode[Object.keys(colObjCode).pop()];
// // and then add the new element to the object {3: "display_value,Display Value"}
// colObjCode[Object.keys(colObjCode).length + 1] = "display_value,Display Value";

// console.log(colObjCode);

// var colObj = {
//   1: "c_code,C code",
//   2: "c_description,C description",
//   3: "v_code,V code",
//   4: "v_description,V description",
//   5: "description,Description",
// };

// // change the key 5 to 0
// colObj[0] = colObj[5];
// // remove the key 5
// delete colObj[5];

// colObj[Object.keys(colObj).length] = "display_value,Display Value";

// console.log(colObj);

// var formObj = {
//   0: "c_code",
//   1: "c_description",
//   2: ".split",
//   3: "v_code",
//   4: "v_description",
//   5: ".end_split",
//   6: ".begin_split",
//   7: "production_area",
//   8: ".split",
// };
// if (formObj[8].indexOf(".") > -1) {
//   console.log("yes");
// }

var colObjCode = {
  1: "code,Code",
  2: "description,Description",
};
colObjCode[Object.keys(colObjCode).length + 1] = "display_value,Display Value";

// remove the last element from the object
delete colObjCode[Object.keys(colObjCode).pop()];

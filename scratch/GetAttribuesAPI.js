// getting teh Attributes from the undocumented API
// var ca = new GlideColumnAttributes("incident");
// for (var member in ca) gs.print(member);
// var ca = new GlideTableCreator("test", "test");
// for (var member in ca) gs.print(member);

//  40 Specification Option - Parent
//  30 Specs - Refrence of Created Tables
//  10 Main Tables

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

// var colObjCode = {
//   1: "code,Code",
//   2: "description,Description",
// };
// colObjCode[Object.keys(colObjCode).length + 1] = "display_value,Display Value";

// // remove the last element from the object
// delete colObjCode[Object.keys(colObjCode).pop()];

// var tableLabel = "Hamza Tesla (FPC17)";
// // remove the brackets and the content inside them
// var tableName = tableLabel.replace(/\(.*?\)/g, "").trim();
// console.log(tableName);

// var tableLabel = "Hamza Tesla (FPC17)";
// var checkTabel = "Test Hamza Now (FPC25)";
// var checkTabelwoFpc = checkTabel.replace(/\(.*?\)/g, "").trim();

// // check checkTabelwoFpc exists in tableLabel and first lowercase the tableLabel
// if (tableLabel.toLowerCase().indexOf(checkTabelwoFpc.toLowerCase()) > -1) {
//   console.log("yes");
// }

// var colObjCode = {
//   1: "code,Code",
//   2: "description,Description",
// };

// // get the total length of the object
// var objLength = Object.keys(colObjCode).length;
// console.log(objLength);

// var same_info_mods = {
//   "Cab type (FPC42)": 190,
//   "Cab type (FPC92)": 195,
//   "Cab type (FPC889)": 200,
// };


// // Script: B Hamza:120,
// //  B Hamza Axle:130,
// //  B Hamza Tesla:145,
// //  B Hamza Tesla SX:150,
//   // "Cab type (FPC42)": 190,
//   // "Cab type (FPC92)": 195,
//   // "Cab type (FPC889)": 200,
// //  No Hamza V:300,
// //  P Hamza 4:400,
// //  V Hamza Tes:525,
// //  X Hamza:580,
// //  Y Hamza 6:620,

// // create an object named info_mods with above info
// var info_mods = {  
//   "B Hamza": 120,
//   "B Hamza Axle": 130,
//   "B Hamza Tesla": 145,
//   "B Hamza Tesla SX": 150,
//   "Cab type": 200,
//   "No Hamza V": 300,
//   "P Hamza 4": 400,
//   "V Hamza Tes": 525,
//   "X Hamza": 580,
//   "Y Hamza 6": 620,
// };

// // get the element value before "Cab type" in the object info_mods
// var tableLabel = "Cab type (FPC80)";

// var tableLabelwoFPC = tableLabel.replace(/\(.*?\)/g, "").trim();

// var befTableLabelOrd = 0;
// var initOrder = 105;
// var finalOrder = 700;
// var infoModsKeys = Object.keys(info_mods);
// for (var i=0; i<infoModsKeys.length; i++){
//   if (infoModsKeys[i] === tableLabelwoFPC) {
//     if (i !== 0){
//       befTableLabelOrd = info_mods[infoModsKeys[i-1]];
//       break;
//     }

//     else if (i === 0){
//       befTableLabelOrd = initOrder;
//       break;
//     }
//   }
// }

// var afTableLabelOrd = 0;
// for (var i=0; i<infoModsKeys.length; i++){
//   if (infoModsKeys[i] === tableLabelwoFPC) {
//     if (i !== infoModsKeys.length-1){
//       afTableLabelOrd = info_mods[infoModsKeys[i+1]];
//       break;
//     }

//     else if (i === infoModsKeys.length-1){
//       afTableLabelOrd = finalOrder;
//       break;
//     }
//   }
// }



// var newOrder = 0;

// var fpcNumberOnly = parseInt(tableLabel.match(/\d+/g).map(Number)[0]);

// var keysList = Object.keys(same_info_mods);

// for (var i=0; i < keysList.length; i++) {

//   var fpcNumberKey = parseInt(keysList[i].match(/\d+/g).map(Number)[0]);

//   if(fpcNumberOnly < fpcNumberKey){
//     // case-1 if the table label is in-between the keys
//     if (i !== 0) {
//       newOrder = Math.round(
//         (same_info_mods[keysList[i]] + same_info_mods[keysList[i - 1]]) / 2
//       );
//       break;
//     }
//     // case-2 if the table label is the first key
//     else if (i === 0) {
//       newOrder = Math.round((same_info_mods[keysList[i]] + befTableLabelOrd) / 2);
//       break;
//     }
//   }
// }
// // case-3 if the table label is the end key
// if (newOrder === 0){
//   newOrder = Math.round((same_info_mods[keysList[keysList.length-1]] + afTableLabelOrd) / 2);
// }

// console.log(newOrder);


// var info_mods = {
//   "B Hamza": 120,
//   "B Hamza Axle": 130,
//   "B Hamza Tesla": 145,
//   "B Hamza Tesla SX": 150,
//   "Cab type": 200,
//   "No Hamza V": 300,
//   "P Hamza 4": 400,
//   "V Hamza Tes": 525,
//   "X Hamza": 580,
//   "Y Hamza 6": 620,
// };

// var newOrder = 0;

// // get the element value before "Cab type" in the object info_mods
// var tableLabel = "Jab Fuel (FPC80)";

// var tableLabelwoFPC = tableLabel.replace(/\(.*?\)/g, "").trim();
// var initOrder = 105;
// var finalOrder = 700;
// var infoModsKeys = Object.keys(info_mods);


// for (var i=0; i<infoModsKeys.length; i++){
//   if (!(tableLabelwoFPC > infoModsKeys[i])) {
//     if (i !== 0){
//       newOrder = Math.round((info_mods[infoModsKeys[i]] + info_mods[infoModsKeys[i-1]]) / 2);
//       break;
//     }
//     else if (i === 0){
//       newOrder = Math.round((info_mods[infoModsKeys[i]] + initOrder) / 2);
//       break;
//     }
//   }
// }
// if (newOrder === 0){
//   newOrder = Math.round((finalOrder + info_mods[infoModsKeys[infoModsKeys.length-1]]) / 2);
// }
// console.log(newOrder);

// var gr = new GlideRecord("u_duration_table");
// gr.get("95acbb030770e110ab46f1d08c1ed023");
// var created = gr.getValue("sys_created_on");




// var strDate = new GlideDateTime(created); 
// var endDate = new GlideDateTime(); 

// var diffSeconds = gs.dateDiff(strDate.getDisplayValueInternal(),endDate.getDisplayValueInternal(), false);  
// gs.info(diffSeconds);
// gr.u_duration_test = diffSeconds;
// gr.update();

// gs.info("str disp " + strDate.getDisplayValue()+ " str disp int"+ strDate.getDisplayValueInternal())
// gs.info("end disp " + endDate.getDisplayValue()+ " end disp int"+ endDate.getDisplayValueInternal())

// var tes = new GlideDateTime();
// gs.info(tes.getDisplayValueInternal());

var tableLabel = "Cab type (FPC344)";
var tableLabelwoFpc = tableLabel.replace(/\(.*?\)/g, "").trim();
// // check if table contains (FPC<numbeR>)

// if (tableLabel.includes("(FPC")) {
//   var fpcNumberOnly = parseInt(tableLabel.match(/\d+/g).map(Number)[0]);
//   gs.info(fpcNumberOnly);
// }


var same_info_mods = {
  "Cab type (FPC42)": 190,
  "Cab type (FPC92)": 195,
  "Cab type (FPC889)": 200,
};

// check if tableLabelwoFPC exists as substring in 'same_info_mods' keys
var keysList = Object.keys(same_info_mods);
var existCheck = false;
for (var i=0; i < keysList.length; i++) {
    if (keysList[i].includes(tableLabelwoFpc)) {
        existCheck = true;
        break;
    }
}
console.log(existCheck);
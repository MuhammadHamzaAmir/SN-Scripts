var CGTable = Class.create();
CGTable.prototype = {
  initialize: function () {},

  createTable: function (name, label) {
    // Create a new table in ServiceNow with the following fields:
    // c_code (set as unique), v_code (set as unique), v_description,
    // c_description, and description (set as Display Value).

    var tableName = name;
    var tableLabel = label;
    var codeCheck = tableLabel.indexOf("FPC") > -1;
    var fpcNumber = "";
    var table = new GlideTableCreator(tableName, tableLabel);
    var attrs = new Packages.java.util.HashMap();
    if (codeCheck) {
      // get the FPC number from the table label
      fpcNumber = tableLabel.match(/FPC\d+/)[0].toLowerCase();

      var colObj = {
        1: "c_code,C code",
        2: "c_description,C description",
        3: "v_code,V code",
        4: "v_description,V description",
        5: "description,Description",
      };

      // table & attributes

      for (i in colObj) {
        var colName = colObj[i].split(",")[0];
        var colLabel = colObj[i].split(",")[1];
        var ca = new GlideColumnAttributes(colName);
        ca.setType("string");
        ca.setLength("40");
        // 			ca.setLabel(colLabel);
        ca.setUsePrefix(false);
        attrs.put(colName, ca);
      }
    } else {
      var colObjCode = {
        1: "code,Code",
        2: "description,Description",
      };

      // table & attributes

      for (i in colObjCode) {
        var colNameCode = colObjCode[i].split(",")[0];
        var colLabelCode = colObjCode[i].split(",")[1];
        var caCode = new GlideColumnAttributes(colNameCode);
        caCode.setType("string");
        caCode.setLength("40");
        // 			ca.setLabel(colLabel);
        caCode.setUsePrefix(false);
        attrs.put(colNameCode, caCode);
      }
    }
    var extends_table = "x_889851_test_hamz_specification_option_parent";
    table.setColumnAttributes(attrs);
    if (typeof extends_table != "undefined") {
      table.setExtends(extends_table);
    }
    table.update();

    var gr = new GlideRecord("sys_dictionary");
    gr.addEncodedQuery(
      "sys_scope=2fbbfeec07a46110ab46f1d08c1ed0d2^name=" +
        tableName +
        "^element=description"
    );
    gr.query();
    gr.next();
    gr.setValue("display", "true");
    gr.update();

    // adding to app modules

    var tgr = new GlideRecord("sys_db_object");
    tgr.addEncodedQuery(
      "sys_update_nameISNOTEMPTY^name=" +
        tableName +
        "^sys_scope=2fbbfeec07a46110ab46f1d08c1ed0d2"
    ); // app sys_id
    tgr.query();
    tgr.next();
    var tabsys_id = tgr.getUniqueValue();
    var tab_lab = tgr.label;
    // gs.print(tab_lab);

    var igr = new GlideRecord("sys_app_module");
    igr.initialize();
    igr.title = tab_lab;
    igr.setValue("application", "3fbb326007e46110ab46f1d08c1ed04c"); // app menu sys_id not of application
    igr.setValue("roles", "x_889851_test_hamz.user");
    igr.name = tableName;
    igr.insert();

    // changing the order
    var mod_gr = new GlideRecord("sys_app_module");
    mod_gr.addEncodedQuery(
      "application=3fbb326007e46110ab46f1d08c1ed04c^order!=0"
    );
    mod_gr.orderBy("order");
    mod_gr.query();
    var info_mods = {};
    while (mod_gr.next()) {
      info_mods[mod_gr.getValue("title")] = mod_gr.getValue("order");
    }
    for (i in info_mods) gs.print(info_mods[i] + " " + i);

    var item = tableLabel;

    // assign a number to the item based upon the info_mods in alphabetical order
    var itemNumber = 0;
    for (var member in info_mods) {
      if (member < item) {
        itemNumber += parseInt(info_mods[member]);
      }
    }
    var nextNumber = 0;
    // find the next number in the info_mods which is greater than the itemNumber
    for (var members in info_mods) {
      if (parseInt(info_mods[members]) > itemNumber) {
        nextNumber = parseInt(info_mods[members]);
        break;
      }
    }
    // mid point between the two numbers
    var midPoint = Math.round((itemNumber + nextNumber) / 2);

    var assignNum = 0;
    if (nextNumber == 0) {
      assignNum = itemNumber;
    } else {
      assignNum = midPoint;
    }

    var ord_gr = new GlideRecord("sys_app_module");
    ord_gr.addEncodedQuery(
      "application=3fbb326007e46110ab46f1d08c1ed04c^order=0^ORorder=NULL^title=" +
        tableLabel +
        "^nameLIKE" +
        tableName
    );
    ord_gr.query();
    ord_gr.next();
    ord_gr.order = assignNum;
    ord_gr.update();

    var table_sys_id_gr = new GlideRecord("sys_db_object");
    table_sys_id_gr.addEncodedQuery(
      "sys_update_nameISNOTEMPTY^sys_scope=2fbbfeec07a46110ab46f1d08c1ed0d2^super_class=6fbbfeec07a46110ab46f1d08c1ed0d2^name=" +
        tableName +
        "^label=" +
        tableLabel
    );
    table_sys_id_gr.query();
    table_sys_id_gr.next();
    var cr_tb_sys_id = table_sys_id_gr.getUniqueValue();

    //adding field to Specs table

    var dic_table = new GlideTableCreator(
      "x_889851_test_hamz_specs_refrence_of_created_table",
      "Specs - Refrence of Created Table"
    );
    attrs = new Packages.java.util.HashMap();
    var tableNameWOBrackets = "";
    if (codeCheck) {
      ca = new GlideColumnAttributes(fpcNumber);
      ca.setType("reference");
      ca.setUsePrefix(false);
      attrs.put(fpcNumber, ca);
    } else {
      // tables without fpc numbers
      tableNameWOBrackets = tableLabel.trim().replace(" ", "_").toLowerCase();
      ca = new GlideColumnAttributes(tableNameWOBrackets);
      ca.setType("reference");
      ca.setUsePrefix(false);
      attrs.put(tableNameWOBrackets, ca);
    }
    dic_table.setColumnAttributes(attrs);
    dic_table.update();

    var queryTable = codeCheck ? fpcNumber : tableNameWOBrackets;

    var dic_gr_specs = new GlideRecord("sys_dictionary");
    dic_gr_specs.addEncodedQuery(
      "name=x_889851_test_hamz_specs_refrence_of_created_table^element=" +
        queryTable
    );
    dic_gr_specs.query();
    dic_gr_specs.next();

    dic_gr_specs.setValue("reference", tableName);
    if (codeCheck) {
      var tableLabelWOBrackets = "";
      // check if the table label contains brackets
      if (tableLabel.indexOf("(") > -1 || tableLabel.indexOf(")") > -1) {
        // remove the brackets
        tableLabelWOBrackets = tableLabel.replace(/[()]/g, "").trim();
      } else {
        tableLabelWOBrackets = tableLabel;
      }
      dic_gr_specs.setValue("column_label", tableLabelWOBrackets);
      dic_gr_specs.setValue(
        "attributes",
        "ref_ac_columns=c_code;v_code,ref_ac_columns_search=true,ref_auto_completer=AJAXTableCompleter"
      );
    } else {
      dic_gr_specs.setValue("column_label", tableLabel);
      dic_gr_specs.setValue(
        "attributes",
        "ref_ac_columns=code,ref_ac_columns_search=true,ref_auto_completer=AJAXTableCompleter"
      );
    }
    dic_gr_specs.update();

    // for only tables with FPC numbers
    if (codeCheck) {
      //writing production area field in table
      dic_table = new GlideTableCreator(tableName, tableLabel);
      attrs = new Packages.java.util.HashMap();
      ca = new GlideColumnAttributes("Production Area");
      ca.setType("glide_list");
      ca.setUsePrefix(false);
      attrs.put("Production Area", ca);
      dic_table.setColumnAttributes(attrs);
      dic_table.update();

      dic_gr_specs = new GlideRecord("sys_dictionary");
      dic_gr_specs.addEncodedQuery(
        "name=" + tableName + "^element=production_area"
      );
      dic_gr_specs.query();
      dic_gr_specs.next();
      dic_gr_specs.setValue("reference", "x_889851_test_hamz_production_area");
      dic_gr_specs.update();
    }
  },

  type: "CGTable",
};

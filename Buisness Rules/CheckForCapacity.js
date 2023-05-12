(function executeRule(current, previous /*null when async*/) {
  // Add your code here

  //     var dataId = "e17beac2872ee91460290ede8bbb35f8";
  var dataId = current.getUniqueValue();

  var relTableCapToDs = new GlideRecord(
    "<M2M_TABLE>"
  );
  relTableCapToDs.addEncodedQuery("<FROM_TABLE>=" + dataId);
  relTableCapToDs.query();
  var flagsUrl = [];

  while (relTableCapToDs.next()) {
    var capLimitSysId = relTableCapToDs.getValue("<TO_TABLE>");
    var capLimitGr = new GlideRecord("<TO_TABLE>");
    capLimitGr.get(capLimitSysId);

    var prodQualDisplayValueArray = capLimitGr
      .getDisplayValue("product_qual")
      .split(",");
    var prodQualValueArray =
      (capLimitGr.getValue("product_qual") || "null").split(",") || "";

    var prodAreaValue = capLimitGr.getValue("production_area");

    var yearsArray = [];
    for (var i = 1; i < 11; i++) {
      yearsArray.push(capLimitGr.getDisplayValue("year_" + i));
    }

    var propsQuery = "collection=" + dataId + "^";

    // adding technical options to query
    var techOpsName = "";
    var fpcNumberOnly = 0;
    for (i = 0; i < prodQualDisplayValueArray.length; i++) {
      fpcNumberOnly = 0;
      techOpsName = prodQualDisplayValueArray[i]
        .split(":")[0]
        .toLowerCase()
        .trim();

      if (techOpsName.includes("fpc")) {
        fpcNumberOnly = parseInt(techOpsName.match(/\d+/g).map(Number)[0]);
        propsQuery += "fpc" + fpcNumberOnly + "=" + prodQualValueArray[i] + "^";
      } else if (techOpsName.length > 1) {
        if (techOpsName.includes(" ")) {
          techOpsName = techOpsName.replace(/\s/g, "_");
        }
        propsQuery += techOpsName + "=" + prodQualValueArray[i] + "^";
      }
    }

    // add production area to query
    if (prodAreaValue !== null) {
      propsQuery += "production_area=" + prodAreaValue + "^";
    }

    //adding years to query

    for (var j = 0; j < yearsArray.length; j++) {
      if (yearsArray[j] !== "") {
        propsQuery += "year_" + (j + 1) + ">" + yearsArray[j] + "^OR";
        // gs.info(yearsArray[j]);
      }
    }

  var specs = new GlideRecord("<PROPERTIES_TABLE>");
    specs.addEncodedQuery(propsQuery);
    specs.query();

    var queryResult = specs.getRowCount();

    if (queryResult > 0) {
      var url =
        gs.getProperty("glide.servlet.uri") +
        "<PROPERTIES_TABLE_NAME_list.do?sysparm_query=" +
        propsQuery;
      var link =
        '<a target="_blank" rel="noopener" href="' +
        url +
        '">Click here to see details</a>';
      flagsUrl.push(link);
    }
  }

  if (flagsUrl.length > 0) {
    var info = "The following Properties exceeds the capacity limits:<br/>";
    for (var k = 0; k < flagsUrl.length; k++) {
      info += "Properties List " + (k + 1) + ": " + flagsUrl[k] + "<br/>";
    }
    current.information = info;
  } else {
    current.information = "";
  }
  current.update();
})(current, previous);

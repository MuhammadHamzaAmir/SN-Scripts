function getSumYearsPreview(dataSetRecord, convsRecord) {
  var svCon = new SVConverter();
  var query = svCon.getSourceSpecificationEncodedQuery(
    dataSetRecord,
    convsRecord
  );


  var agg = new GlideAggregate("<DATA_TABLE>");
  agg.addEncodedQuery(query);
  agg.setGroup(false);
  agg.addAggregate("SUM", "year_1");
  agg.addAggregate("SUM", "year_2");
  agg.addAggregate("SUM", "year_3");
  agg.addAggregate("SUM", "year_4");
  agg.addAggregate("SUM", "year_5");
  agg.addAggregate("SUM", "year_6");
  agg.addAggregate("SUM", "year_7");
  agg.addAggregate("SUM", "year_8");
  agg.addAggregate("SUM", "year_9");
  agg.addAggregate("SUM", "year_10");
  agg.query();

  var resultYears = {};
  if (agg.next()) {
    resultYears["year_1"] = Math.round(agg.getAggregate("SUM", "year_1"));
    resultYears["year_2"] = Math.round(agg.getAggregate("SUM", "year_2"));
    resultYears["year_3"] = Math.round(agg.getAggregate("SUM", "year_3"));
    resultYears["year_4"] = Math.round(agg.getAggregate("SUM", "year_4"));
    resultYears["year_5"] = Math.round(agg.getAggregate("SUM", "year_5"));
    resultYears["year_6"] = Math.round(agg.getAggregate("SUM", "year_6"));
    resultYears["year_7"] = Math.round(agg.getAggregate("SUM", "year_7"));
    resultYears["year_8"] = Math.round(agg.getAggregate("SUM", "year_8"));
    resultYears["year_9"] = Math.round(agg.getAggregate("SUM", "year_9"));
    resultYears["year_10"] = Math.round(agg.getAggregate("SUM", "year_10"));
  }
  return resultYears;
}

var convSetSysId = "f1d80d3e1b8b2110df25400de54bcb4b";
var dataSetSysId = "eb831a881b21e110df25400de54bcb0c";

var dataSetGr = new GlideRecord("<DATA_TABLE>");
dataSetGr.get(dataSetSysId);

var convSetGr = new GlideRecord("<CONVS_SET_TABLE>");
convSetGr.get(convSetSysId);

var result = {};
result["conversion_set"] = convSetGr.getValue("name");

var convsGr = new GlideRecord("<CONVS_TABLE>");
convsGr.addEncodedQuery("conversion_set=" + convSetSysId);
convsGr.orderBy("index");
convsGr.query();

var conversions = [];

while (convsGr.next()) {
  var convObj = {};
  var index = convsGr.getValue("index");
  var srcSpecs = convsGr.getDisplayValue("source_specification");

  convObj["sys_id"] = convsGr.getUniqueValue();
  convObj["index"] = index;
  convObj["srcSpecs"] = srcSpecs;

  var yearsObj = getSumYearsPreview(dataSetGr, convsGr);

  var targetSpecsGr = new GlideRecord("<TAR_TABLE>");
  targetSpecsGr.addEncodedQuery("conversion=" + convsGr.getUniqueValue());
  targetSpecsGr.orderBy("index");
  targetSpecsGr.query();

  var targetSpecsArray = [];
  while (targetSpecsGr.next()) {
    var tarObj = {};
    tarObj["target_specifications"] = targetSpecsGr.getDisplayValue(
      "target_specification"
    );
    var years = [];
    for (var i = 1; i < 11; i++) {
      var calVol =
        (yearsObj["year_" + i] * Number(targetSpecsGr.getValue("year_" + i))) /
        100;
      // years.push(targetSpecsGr.getValue("year_" + i));
      years.push(calVol);
    }
    tarObj["years"] = years;
    targetSpecsArray.push(tarObj);
    //                 convObj[targetSpecsGr.getValue('index')] = tarObj;
  }
  convObj["tar_specs"] = targetSpecsArray;
  conversions.push(convObj);
}
result["conversions"] = conversions;
result;

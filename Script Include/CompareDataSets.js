var gr1 = new GlideRecord("<TABLE>");
gr1.get("3c16d7f787f7515460290ede8bbb354e");
var sv = new SVHelper();
var gr1_map = sv.getDataSetMap(gr1);

var gr2 = new GlideRecord("<TABLE>");
gr2.get("412e25dd8733d1d060290ede8bbb35ba");
var gr2_map = sv.getDataSetMap(gr2);


var yearsFirst = {};

for (var i = 1; i <= 10; i++) {
  yearsFirst["year_" + i] = 0;
}
for (var key in gr1_map) {
  var allYears = gr1_map[key];
  for (var year in allYears) {
    yearsFirst[year] += allYears[year];
  }
}

var yearsSecond = {};

for (var i = 1; i <= 10; i++) {
  yearsSecond["year_" + i] = 0;
}
for (var key in gr2_map) {
  var allYears = gr2_map[key];
  for (var year in allYears) {
    yearsSecond[year] += allYears[year];
  }
}

diffYears = {};
for (var year in yearsFirst) {
  diffYears[year] = Math.round(Math.abs(yearsFirst[year] - yearsSecond[year]));
}

// round yearsFirst & yearsSecond
for (var year in yearsFirst) {
  yearsFirst[year] = Math.round(yearsFirst[year]);
  yearsSecond[year] = Math.round(yearsSecond[year]);
}


var yearsRes = {};
yearsRes.diff = diffYears;
yearsRes.first = yearsFirst;
yearsRes.sec = yearsSecond;


// getting conversion orders
var convSets = {};

var gr1ConSetsID = [];
var gr2ConSetsID = [];

var gr1ConOrdsQuery = new GlideRecord("<TABLE>");

gr1ConOrdsQuery.addEncodedQuery("<TABLE>=" + gr1.sys_id);

gr1ConOrdsQuery.query();

while(gr1ConOrdsQuery.next()){
	gr1ConSetsID.push(gr1ConOrdsQuery.getValue("<TABLE>"));
}

var gr2ConOrdsQuery = new GlideRecord("<TABLE>");

gr2ConOrdsQuery.addEncodedQuery("<TABLE>=" + gr2.sys_id);

gr2ConOrdsQuery.query();

while(gr2ConOrdsQuery.next()){
	gr2ConSetsID.push(gr2ConOrdsQuery.getValue("<TABLE>"));
}

// remove any null values from gr1ConSetsID and gr2ConSetsID
gr1ConSetsID = gr1ConSetsID.filter(function (el) {
  return el != null;
});
gr2ConSetsID = gr2ConSetsID.filter(function (el) {
  return el != null;
});

// getting names of conversion sets
var gr1ConSetsNames = [];
var gr2ConSetsNames = [];

for (var i = 0; i < gr1ConSetsID.length; i++) {
  var gr1ConSet = new GlideRecord("<TABLE>");
  gr1ConSet.get(gr1ConSetsID[i]);
  gr1ConSetsNames.push(gr1ConSet.getValue("name"));
}

for (var i = 0; i < gr2ConSetsID.length; i++) {
  var gr2ConSet = new GlideRecord("<TABLE>");
  gr2ConSet.get(gr2ConSetsID[i]);
  gr2ConSetsNames.push(gr2ConSet.getValue("name"));
}

convSets.first = gr1ConSetsNames;
convSets.sec = gr2ConSetsNames;

//getting conversions & Source Specifications
var conversions = {};
var gr1Conversions = {};
var gr2Conversions = {};


for (var k=0; k < gr1ConSetsID.length; k++){
  
  var srcSpecs = [];

  var gr1ConQuery = new GlideRecord("<TABLE>");

  gr1ConQuery.addEncodedQuery("<TABLE>=" + gr1ConSetsID[k]);

  gr1ConQuery.query();

  while(gr1ConQuery.next()){
    srcSpecs.push(gr1ConQuery.getDisplayValue("<TABLE>"));
  }
    
  gr1Conversions[gr1ConSetsNames[k]] = srcSpecs;
  
}

for (var k=0; k < gr2ConSetsID.length; k++){
    
    var srcSpecs = [];
  
    var gr2ConQuery = new GlideRecord("<TABLE>");
  
    gr2ConQuery.addEncodedQuery("<TABLE>=" + gr2ConSetsID[k]);
  
    gr2ConQuery.query();
  
    while(gr2ConQuery.next()){
      srcSpecs.push(gr2ConQuery.getDisplayValue("<TABLE>"));
    }
      
    gr2Conversions[gr2ConSetsNames[k]] = srcSpecs;
    
  }

  conversions.first = gr1Conversions;
  conversions.sec = gr2Conversions;

  
var finalRes = {};
finalRes.years = yearsRes;
finalRes.convs = conversions;
finalRes;
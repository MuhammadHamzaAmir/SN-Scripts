
var gr = new GlideRecord("<DATA_TABLE>");
var dataSetSysId = "5ad5c2c787876d5060290ede8bbb35b3";
gr.get(dataSetSysId);
gr;

var volumeMultiplierMap = {
  dfc2987: {
    // Axle type - rear
    dfc68: {
      // rear axle execution
      ad5a6fac872865d8d11463de8bbb35fb: 1, // single drive
      d06a23ec872865d8d11463de8bbb35b0: 2, // tandem
    },
  },
  dfc2986: {
    // Axle type - front
    dfc1165: {
      // Front axle quantity
      e2f827ac87e465d8d11463de8bbb3539: 1, // A-1
      "4f2a2b6c872865d8d11463de8bbb3538": 2, // B-2
    },
  },
};

var traits = "215555391b262114df25400de54bcb15";

var traitsArray = traits.split(",");
var traitsQuery = "^";

traitsArray.forEach(function (sysId, index) {
  var gr = new GlideRecord("<TRAIT_TABLE>");
  if (gr.get(sysId)) {
    var condition = gr.getValue("condition");
    if (index > 0) {
      traitsQuery += "^OR";
    }
    traitsQuery += condition;
  }
});
var sv = new SVClientHelper();
var helper = new SVHelper();
var displayValueMap = helper.getDisplayValueMap();

var optionsOverview = {};
var allocationMap = {};

var dataSet = new GlideRecord("<DATA_TABLE>");
dataSet.get(dataSetSysId);
var encodedQuery = "collection=" + dataSet.sys_id + traitsQuery;

var technicalOptions = [];
var technicalOptionTableParamPrefix = "tableID";
var noOfTechnicalOptions = 1;

var axleCalFlag = false;
var axleVol = "";
var axleOps = [];

var ids = [
  "bde0bff387b355908d43da8bbbbb35e4",
  "7c77b26887e021d88d43da8bbbbb3516",
];
if (noOfTechnicalOptions > 9)
  //throttling
  noOfTechnicalOptions = 9;
for (var idx = 0; idx < noOfTechnicalOptions; idx++) {
  var selectedOption = new GlideRecord("sys_db_object");
  selectedOption.get(ids[idx]);

  var tableLabel = selectedOption.label + "";
  var tableName = (selectedOption.name + "").split("sv_")[1];
  for (key in volumeMultiplierMap) {
    if (
      selectedOption.getValue("name").includes(key) &&
      noOfTechnicalOptions == 1
    ) {
      axleCalFlag = true;
      axleVol = key;
    }
  }
  technicalOptions.push([tableLabel, tableName]);
}
gs.info(axleCalFlag + " " + axleVol);

// getting the inner axles for calculation
var axleTableToCal = "";
if (axleCalFlag && noOfTechnicalOptions == 1) {
  var volumeMulObj = volumeMultiplierMap[axleVol];
  var innerAxle = Object.keys(volumeMulObj)[0];

  gs.info("volMapObj: " + innerAxle);
  var tabPrefix = "x_scvab_sv_";
  axleTableToCal = tabPrefix + innerAxle;
  var reSelectedOption = new GlideRecord("sys_db_object");
  reSelectedOption.addEncodedQuery("name=" + tabPrefix + innerAxle);
  reSelectedOption.query();
  reSelectedOption.next();

  var reTableLabel = reSelectedOption.label + "";
  var reTableName = (reSelectedOption.name + "").split("sv_")[1];
  gs.info(reTableLabel + " " + reTableName);
  technicalOptions.push([reTableLabel, reTableName]);
  noOfTechnicalOptions = 2;
}

dataSet.query();
var startYear = Number(dataSet.getValue("start_year"));

var _headers = [];
var agg = new GlideAggregate("<SPECS_TABLE>");
agg.addEncodedQuery(encodedQuery);
for (var idx = 0; idx < noOfTechnicalOptions; idx++) {
  agg.orderBy(technicalOptions[idx][1]);
  _headers.push(technicalOptions[idx][0]);
  if (volumeMultiplierMap[tableName] && noOfTechnicalOptions == 1) {
    agg.orderBy(Object.keys(volumeMultiplierMap[tableName])[0]);
  }
}
for (var i = 0; i < 10; i++) {
  agg.addAggregate("SUM", "year_" + (i + 1));
  _headers.push(startYear + i);
}
agg.query();

var result = {};
result["resultArr"] = [];
var tempSummary = {};
while (agg.next()) {
  var optionsArr = [];
  var hasNonZeroValue = false;
  for (var idx = 0; idx < noOfTechnicalOptions; idx++) {
    optionsArr.push(displayValueMap[agg.getValue(technicalOptions[idx][1])]);
  }

  for (var i = 0; i < 10; i++) {
    var value = Number(agg.getAggregate("SUM", "year_" + (i + 1)));
    var firstSelectedOption = technicalOptions[0][1];

    //Multiplier calculations
    if (noOfTechnicalOptions == 1 && volumeMultiplierMap[firstSelectedOption]) {
      if (volumeMultiplierMap[firstSelectedOption]) {
        for (var key in volumeMultiplierMap[firstSelectedOption]) {
          var deciderValue = agg.getValue(key);
          if (
            volumeMultiplierMap[firstSelectedOption][key].hasOwnProperty(
              deciderValue
            )
          ) {
            value *=
              volumeMultiplierMap[firstSelectedOption][key][deciderValue];
          }
        }
      }

      if (!tempSummary[optionsArr[0]]) {
        tempSummary[optionsArr[0]] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      }
      tempSummary[optionsArr[0]][i] += value;
    } else {
      optionsArr.push(value);
    }

    if (value !== 0 && Object.keys(tempSummary).length == 0) {
      hasNonZeroValue = true;
    }
  }

  if (hasNonZeroValue) {
    result["resultArr"].push(optionsArr);
  }
}

for (var key in tempSummary) {
  optionsArr = [key].concat(tempSummary[key]);
  result["resultArr"].push(optionsArr);
}

result["_headers"] = _headers;

// applying multiplier
if (axleCalFlag) {
  var axleTableToCalDisplayValue = "";

  var volumeMulObj = volumeMultiplierMap[axleVol];
  var innerVolMapObj = volumeMulObj[Object.keys(volumeMulObj)[0]];

  var axleOpGr = new GlideRecord(axleTableToCal);
  axleOpGr.query();
  axleTableToCalDisplayValue = axleOpGr.getClassDisplayValue();

  for (key in innerVolMapObj) {
    while (axleOpGr.next()) {
      innerVolMapObj[axleOpGr.getValue("description")] =
        innerVolMapObj[axleOpGr.getUniqueValue()];
      delete innerVolMapObj[axleOpGr.getUniqueValue()];
    }
  }

  var lastAxle = "";
  var multiplier = 0;

  var volumesArrayAxles = {};

  var volumesArray = result["resultArr"];

  for (var i = 0; i < volumesArray.length; i++) {
    for (var j = 0; j < volumesArray[i].length; j++) {
      // console.log(typeof volumesArray[i][j]);
      if (j === 0) {
        if (volumesArrayAxles.hasOwnProperty(volumesArray[i][j])) {
          volumesArrayAxles[volumesArray[i][j]] += 1;
        } else {
          volumesArrayAxles[volumesArray[i][j]] = 1;
        }
      }

      // setting the last axle found
      if (lastAxle == "" && j === 0) {
        lastAxle = volumesArray[i][j];
      }
      // if the axle is the same as the last one, we multitply the value when j==1 and check it in innerVolMapObj
      if (j === 1) {
        multiplier = innerVolMapObj[volumesArray[i][j]];
      }
      // if the axle is different from the last one, we set the last axle to the new one and reset the multiplier
      if (j === 0 && lastAxle != volumesArray[i][j]) {
        lastAxle = volumesArray[i][j];
        multiplier = 0;
      }
      // if the multiplier is not 0, we multiply the value
      if (j !== 0 && j !== 1 && multiplier != 0) {
        // skip the iteration
        if (lastAxle.includes("+")) {
          continue;
        }
        volumesArray[i][j] = volumesArray[i][j] * multiplier;
      }
    }
  }

  var newVolumesArray = [];

  var plusVolumesArray = [];

  for (var i = 0; i < volumesArray.length; i++) {
    for (var j = 0; j < volumesArray[i].length; j++) {
      if (j === 0) {
        var currentAxle = volumesArray[i][j];

        if (volumesArray[i][j].includes("+")) {
          var innerPlusArray = volumesArray[i];
          innerPlusArray.splice(1, 1);
          plusVolumesArray.push(innerPlusArray);
          continue;
        }
        if (volumesArrayAxles[volumesArray[i][j]] === 1) {
          var innerModedArray = volumesArray[i];
          innerModedArray.splice(1, 1);
          newVolumesArray.push(innerModedArray);
        } else {
          if (i !== volumesArray.length) {
            var innerModedArrayDup = volumesArray[i];
            innerModedArrayDup.splice(0, 2);
            var nextInnerModedArrayDup = volumesArray[i + 1];
            nextInnerModedArrayDup.splice(0, 2);
            var sumArray = innerModedArrayDup.map(function (num, index) {
              return num + nextInnerModedArrayDup[index];
            });
            sumArray.unshift(currentAxle);
            newVolumesArray.push(sumArray);

            // skip next iteration
            i++;
          }
        }
      }
    }
  }

  // counting axles
  var plusVolumesAxlesCount = {};
  for (var i = 0; i < plusVolumesArray.length; i++) {
    for (var j = 0; j < plusVolumesArray[i].length; j++) {
      if (j === 0) {
        var currentAxle = plusVolumesArray[i][j].split("+");
        for (var k = 0; k < currentAxle.length; k++) {
          if (plusVolumesAxlesCount.hasOwnProperty(currentAxle[k])) {
            plusVolumesAxlesCount[currentAxle[k].trim()] += 1;
          } else {
            plusVolumesAxlesCount[currentAxle[k].trim()] = 1;
          }
        }
      }
      break;
    }
  }

  // adding plus axles
  for (var i = 0; i < newVolumesArray.length; i++) {
    var axleToBeAdded = newVolumesArray[i][0];

    for (var k = 0; k < plusVolumesArray.length; k++) {
      if (
        plusVolumesArray[k][0].includes(axleToBeAdded) &&
        plusVolumesAxlesCount[axleToBeAdded] > 0
      ) {
        var innerPlusArray = plusVolumesArray[k];
        var sumArrayPlus = newVolumesArray[i].map(function (num, index) {
          if (index === 0) {
            return num;
          }
          return num + innerPlusArray[index];
        });
        newVolumesArray[i] = sumArrayPlus;
        plusVolumesAxlesCount[axleToBeAdded] -= 1;
      }
    }
  } // end of for loop

  result["resultArr"] = newVolumesArray;
  var tableHeaders = result["_headers"];
  tableHeaders.splice(1, 1);
  result["_headers"] = tableHeaders;
}

// if (this.getParameter("componentAllocation")) {
//   gs.info("PetarVBD Type of result before passing is: " + typeof result);
//   this.getComponentAllocation(
//     dataSet.sys_id,
//     this.getParameter("componentAllocation"),
//     result
//   );
// }

result;



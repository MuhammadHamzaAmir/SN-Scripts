var volumeMultiplierMap = {
  zpc2987: {
    zpc68: {
      ad5a6fac872865d8d11463de8bbb35fb: 1,
      d06a23ec872865d8d11463de8bbb35b0: 2,
    },
  },
  zpc2986: {
    zpc1165: {
      e2f827ac87e465d8d11463de8bbb3539: 1,
      "4f2a2b6c872865d8d11463de8bbb3538": 2,
    },
  },
};

var tableName = "x_testing_ts_zpc2986";

var axleCalFlag = false;
var axleVol = "";
for (key in volumeMultiplierMap) {
  if (tableName.includes(key)) {
    axleCalFlag = true;
    axleVol = key;
  }
  console.log("key: " + key + " value: " + volumeMultiplierMap[key]);
}
console.log("axleCalFlag: " + axleCalFlag + " axleVol: " + axleVol);

var volMapObj = volumeMultiplierMap["zpc2986"];
var innerVolMapObj = volMapObj[Object.keys(volMapObj)[0]];

for (key in innerVolMapObj) {
  console.log("key: " + key + " value: " + innerVolMapObj[key]);
}

console.log("volMapObj: " + Object.keys(volMapObj)[0]);

var innerVolMapObj = {"1":1,"2":2};

var volumesArray = [
  [
    "GTR20S",
    "1",
    76.296878,
    77.7942861,
    78.0100145,
    82.4963557,
    84.556712,
    81.569003,
    87.5982175,
    88.7025417,
    84.5666672,
    79.840606,
  ],
  [
    "GTR20T",
    "1",
    0.6696662,
    0.6874996,
    0.6725292,
    0.6665372,
    0.6247586,
    0.493634,
    0.4157324,
    0.3143452,
    0.2048482,
    0.1236614,
  ],
  [
    "GTX00S",
    "1",
    0.5056587,
    0.4847781,
    0.452985,
    0.4385995,
    0.4050694,
    0.33644,
    0.2776956,
    0.1941973,
    0.1407183,
    0.0950211,
  ],
  [
    "GTX00S",
    "2",
    0.5056587,
    0.4847781,
    0.4529852,
    0.4385996,
    0.4050694,
    0.33644,
    0.2776956,
    0.1941973,
    0.1407184,
    0.0950211,
  ],
  [
    "GTX00T",
    "1",
    4.5509282,
    4.363003,
    4.0768651,
    3.9473954,
    3.6456247,
    3.02796,
    2.4992605,
    1.7477757,
    1.2664647,
    0.85519,
  ],
  [
    "GTX22S",
    "1",
    81.8513827,
    82.966456,
    81.2771664,
    82.2643056,
    80.2495153,
    69.4737696,
    65.7059047,
    59.0576287,
    50.2505145,
    43.1208256,
  ],
  [
    "GTX22S",
    "2",
    1.3461505,
    1.313306,
    1.2422346,
    1.2104676,
    1.1225181,
    0.919697,
    0.7632574,
    0.5455672,
    0.3838607,
    0.2518729,
  ],
  [
    "GTX22T",
    "1",
    1.5169761,
    1.4543343,
    1.358955,
    1.3157985,
    1.2152082,
    1.00932,
    0.8330868,
    0.5825919,
    0.4221549,
    0.2850633,
  ],
  [
    "GTX22T",
    "2",
    2.0226346,
    1.9391124,
    1.8119402,
    1.7543978,
    1.6202776,
    1.34576,
    1.1107826,
    0.7767892,
    0.5628732,
    0.3800846,
  ],
  [
    "GTX40S",
    "1",
    408.3621468,
    399.410927,
    382.2151483,
    381.2911537,
    360.3915707,
    319.0695307,
    294.7176292,
    237.2885324,
    198.1576136,
    162.3474326,
  ],
  [
    "GTX40S",
    "2",
    61.3401698,
    59.1478654,
    55.5641404,
    54.0136867,
    49.8838223,
    41.4880569,
    34.6017362,
    24.356578,
    17.4690923,
    11.5911232,
  ],
  [
    "GTX40T",
    "1",
    5.5622456,
    5.3325591,
    4.9828351,
    4.8245944,
    4.4557634,
    3.70084,
    3.0546517,
    2.1361703,
    1.5479013,
    1.0452322,
  ],
  [
    "GTX40T",
    "2",
    1.516976,
    1.4543343,
    1.3589551,
    1.3157984,
    1.2152082,
    1.00932,
    0.8330869,
    0.5825919,
    0.4221549,
    0.2850634,
  ],
  [
    "GTX60S",
    "1",
    1832.9122438,
    1864.4334071,
    1870.5824416,
    2005.1479899,
    2113.1955575,
    2157.8513787,
    2457.1480155,
    2608.6457542,
    2763.9528495,
    2834.8434468,
  ],
  [
    "GTX60S",
    "2",
    2.1866423,
    2.1418339,
    2.0314842,
    1.9823357,
    1.8399668,
    1.502954,
    1.2488192,
    0.8969371,
    0.6270031,
    0.4087247,
  ],
  [
    "GTX60T",
    "1",
    3.0401249,
    2.931463,
    2.7765559,
    2.7312168,
    2.4998183,
    2.1588385,
    1.8958371,
    1.3278481,
    0.9505536,
    0.600731,
  ],
  [
    "GTM00T",
    "1",
    1.632007,
    2.8661079,
    3.8370046,
    5.7047851,
    8.3618629,
    11.4315007,
    15.7967706,
    20.181498,
    24.3504021,
    27.8796975,
  ],
  [
    "GTM00T",
    "2",
    15.1697602,
    14.5433436,
    13.5895508,
    13.1579842,
    12.1520826,
    10.0931999,
    8.3308692,
    5.825919,
    4.2215491,
    2.8506338,
  ],
  [
    "GTA600DS",
    "1",
    108.3476905,
    104.1920115,
    97.5696352,
    94.5786506,
    87.4125416,
    72.4256362,
    59.837735,
    42.0108618,
    30.2811913,
    20.3449623,
  ],
  [
    "GTA600DS + GTX22T",
    "2",
    14.6641014,
    14.0585655,
    13.1365658,
    12.7193845,
    11.7470132,
    9.7567597,
    8.0531738,
    5.6317215,
    4.080831,
    2.755613,
  ],
];

// console.log(volumesArray);


var lastAxle = "";
var multiplier = 0;

var volumesArrayAxles = {};

for (var i=0; i<volumesArray.length; i++){
  for (var j=0; j<volumesArray[i].length; j++){
    // console.log(typeof volumesArray[i][j]);
    if (j === 0){
      if (volumesArrayAxles.hasOwnProperty(volumesArray[i][j])){volumesArrayAxles[volumesArray[i][j]] += 1;}
      else{ volumesArrayAxles[volumesArray[i][j]] = 1; }
    }

    // setting the last axle found
    if ((lastAxle == "") && (j === 0)){
        lastAxle = volumesArray[i][j];
    }
    // if the axle is the same as the last one, we multitply the value when j==1 and check it in innerVolMapObj
    if (j === 1){
        multiplier = innerVolMapObj[volumesArray[i][j]];
    }
    // if the axle is different from the last one, we set the last axle to the new one and reset the multiplier
    if ((j === 0) && (lastAxle != volumesArray[i][j])){
        lastAxle = volumesArray[i][j];
        multiplier = 0;
    }
    // if the multiplier is not 0, we multiply the value
    if (((j !== 0) && (j !== 1)) && (multiplier != 0)){
      // skip the iteration
        if (lastAxle.includes("+")){ continue; }
        volumesArray[i][j] = volumesArray[i][j] * multiplier;
    }
  }
}
// console.log(volumesArrayAxles);

// console.log(volumesArray);

var newVolumesArray = [];

var plusVolumesArray = [];

for (var i=0; i<volumesArray.length; i++){
  for(var j=0; j<volumesArray[i].length; j++){
    if(j === 0){
      var currentAxle = volumesArray[i][j];
      
      if (volumesArray[i][j].includes("+")) {
        var innerPlusArray = volumesArray[i];
        innerPlusArray.splice(1, 1);
        plusVolumesArray.push(innerPlusArray);
        continue;
      }
      if (volumesArrayAxles[volumesArray[i][j]] === 1){
        var innerModedArray = volumesArray[i];
        innerModedArray.splice(1,1);
        newVolumesArray.push(innerModedArray);
      }
      else{
        if (i !== volumesArray.length){
          var innerModedArrayDup = volumesArray[i];
          innerModedArrayDup.splice(0, 2);
          var nextInnerModedArrayDup = volumesArray[i+1];
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

// console.log(newVolumesArray);

// console.log(plusVolumesArray);


// counting axles
var plusVolumesAxlesCount = {};
for (var i=0; i<plusVolumesArray.length; i++){
  for(var j=0; j<plusVolumesArray[i].length; j++){
    if(j === 0){
      var currentAxle = plusVolumesArray[i][j].split("+");
      for (var k=0; k<currentAxle.length; k++){
        if (plusVolumesAxlesCount.hasOwnProperty(currentAxle[k])){plusVolumesAxlesCount[currentAxle[k].trim()] += 1;}
        else{ plusVolumesAxlesCount[currentAxle[k].trim()] = 1; }
      }
    }
    break;
  }
}

// console.log(plusVolumesAxlesCount);

// adding plus axles
for (var i=0; i<newVolumesArray.length; i++){
      var axleToBeAdded = newVolumesArray[i][0];

      for (var k=0; k<plusVolumesArray.length; k++){
        if ((plusVolumesArray[k][0].includes(axleToBeAdded) && (plusVolumesAxlesCount[axleToBeAdded] > 0))){
          var innerPlusArray = plusVolumesArray[k];
          var sumArrayPlus = newVolumesArray[i].map(function (num, index) {
            if (index === 0){return num;}
            return num + innerPlusArray[index];
          });
          newVolumesArray[i] = sumArrayPlus;
          plusVolumesAxlesCount[axleToBeAdded] -= 1;
        }
      }
}



// console.log(volumesArrayAxles);
console.log(newVolumesArray);
// console.log(volumesArray);
// console.log(plusVolumesArray);

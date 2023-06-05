var volumeMultiplierMap = {
  fpc2987: {
    fpc68: {
      ad5a6fac872865d8d11463de8bbb35fb: 1,
      d06a23ec872865d8d11463de8bbb35b0: 2,
    },
  },
  fpc2986: {
    fpc1165: {
      e2f827ac87e465d8d11463de8bbb3539: 1,
      "4f2a2b6c872865d8d11463de8bbb3538": 2,
    },
  },
};

var tableName = "x_testing_ts_fpc2986";

var axleCalFlag = false;
var axleVol = "";
for (key in volumeMultiplierMap) {
    if (tableName.includes(key)) {
        axleCalFlag = true;
    }
    console.log("key: " + key + " value: " + volumeMultiplierMap[key]);
}
console.log("axleCalFlag: " + axleCalFlag);

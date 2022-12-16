// Requiring the module
const reader = require("xlsx");

// Reading our test file
const file = reader.readFile("../Files/Prognosis.xlsx");

let data = [];

const sheets = file.SheetNames;

for (let i = 0; i < sheets.length; i++) {
  const temp = reader.utils.sheet_to_json(file.Sheets[file.SheetNames[i]]);
  temp.forEach((res) => {
    data.push(res);
  });
}

// create an object with the year_1, year_2,...year_3 as keys and the sum of the values as values use a for loop
// to iterate over the data array and add the values to the object

let result = {};

for (let i = 0; i < data.length; i++) {
    for (let key in data[i]) {
        if (key.includes("year")) {
            if (result[key]) {
                result[key] += data[i][key];
            } else {
                result[key] = data[i][key];
            }
        }
    }
}

// apply Math.round to the values of the object

for (let key in result) {
    result[key] = Math.round(result[key]);
}
console.log(JSON.parse(JSON.stringify(result)));

let res = {};
    for (var i = 1; i <= 10; i++) {
      res["year_" + i] = 0;
    }

console.log(res);


/**
 * 
 * var gr = new GlideRecord('x_scvab_sv_volume_source');
gr.get('761872e0875f559060290ede8bbb3524');

var result = {};

if (!(gr.getValue("prognosis_data_set"))){

    for (var i = 1; i <= 10; i++) {
        result["year_" + i] = 0;
    }

}


var svDataImport = new SVDataImport();
var pgData = svDataImport.prognosisDataParse(gr.prognosis_data_set);

for (var i = 0; i < pgData.length; i++) {
    for (var key in pgData[i]) {
        if (key.includes("year")) {
            if (result[key]) {
                result[key] += pgData[i][key];
            } else {
                result[key] = pgData[i][key];
            }
        }
    }
}

for (var key in result) {
    result[key] = Math.round(result[key]);
}

result;
 * 
 * 
 * 
 */

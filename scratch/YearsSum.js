var obj = {
  vs_1: {
    year_1: 1,
    year_2: 2,
    year_3: 3,
    year_4: 4,
    year_5: 5,
    year_6: 6,
    year_7: 7,
    year_8: 8,
    year_9: 9,
    year_10: 10,
  },
  vs_2: {
    year_1: 1,
    year_2: 2,
    year_3: 3,
    year_4: 4,
    year_5: 5,
    year_6: 6,
    year_7: 7,
    year_8: 8,
    year_9: 9,
    year_10: 10,
  },
  vs_3: {
    year_1: 1,
    year_2: 2,
    year_3: 3,
    year_4: 4,
    year_5: 5,
    year_6: 6,
    year_7: 7,
    year_8: 8,
    year_9: 9,
    year_10: 10,
  },
};

// use for loop store 'year_1', year_2'... in obj 
var result = {};
for (var i = 1; i <= 10; i++) {
    var sum = 0;

    for (var key in obj) {
        sum += obj[key]['year_' + i];
    }

    result['year_' + i] = sum;
}




console.log(result);
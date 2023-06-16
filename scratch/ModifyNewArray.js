var array = [0,1,2,3,4,5];
// create a new array and add 99 at index 1 without modifying the original array
var newArray = array.slice(0, 2).concat(99).concat(array.slice(2));
console.log(newArray);
console.log(array);

var arr = [
  [3, ["ee", 2, 323]],
  [23, ["ee", 2, 323]],
  [19, ["zzz", 987, 323]],
  [0, ["e", 2, 323]],
];

// sort the array by the first element of each sub-array
arr.sort(function(a, b) {
    return a[0] - b[0];
    }
);
console.log(arr);
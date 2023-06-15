var array = [0,1,2,3,4,5];
// create a new array and add 99 at index 1 without modifying the original array
var newArray = array.slice(0, 2).concat(99).concat(array.slice(2));
console.log(newArray);
console.log(array);
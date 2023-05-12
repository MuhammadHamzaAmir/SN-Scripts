
var arr1 = ["a", "b", "c", "d", "e"];
var arr2 = ["a", "b", "c", "d", "e", "g", "h", "i", "j"];

var diff = 0;
var diffArr = [];
var whichArr = "";

if (arr1.length > arr2.length) {
  diff = arr1.length - arr2.length;
    whichArr = "arr1";
    for (var i = 0; i < diff; i++) {
        diffArr.push(arr1[arr1.length - 1 - i]);
    }
    // cut off the extra elements from the longer array
    arr1 = arr1.slice(0, arr1.length - diff);
}

else if (arr2.length > arr1.length) {
    diff = arr2.length - arr1.length;
    whichArr = "arr2";
    for (var i = 0; i < diff; i++) {
        diffArr.push(arr2[arr2.length - 1 - i]);
    }
    // cut off the extra elements from the longer array
    arr2 = arr2.slice(0, arr2.length - diff);
}
console.log("diff: " + diff + "\nwhichArr: " + whichArr + "\ndiffArr: " + diffArr + "\narr1: " + arr1 + "\narr2: " + arr2);

// var src = "584b651f876e111060290ede8bbb3511,705ec8f787b9911060290ede8bbb357d,,67b344eb8731511060290ede8bbb352f,4067dd4087c6551060290ede8bbb358a,,904b651f876e111060290ede8bbb3504,";
// // remove consecutive commas and trailing commas
// src = src.replace(/,{2,}/g, ",").replace(/,$/, "");
// console.log(src);
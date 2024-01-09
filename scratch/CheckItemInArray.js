var idToCheck = inputs.identifier;
var items = inputs.array_items["Arrays"];

var out = "";
// check if ID exists in items or not
for (var i = 0; i < items.length; i++) {
  if (arrayOfObjects[i]["id"] === idToCheck) {
    outputs.out = true;
    break;
  }
}
outputs.out = false;

var json = {
  "Arrays": [
    {
      "bySell": "1",
      "craeteUser": "ook",
      "fileN": "TEST",
      "filesize": "98knb",
      "id": "6566",
      "upload": "jhgg",
      "url": "test.com",
    },
    {
      "bySell": "23",
      "craeteUser": "ook",
      "fileN": "TEST",
      "filesize": "98knb",
      "id": "7666",
      "upload": "jhgg",
      "url": "test.com",
    }
  ]
};

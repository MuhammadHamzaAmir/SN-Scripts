var jsonData = [
  { order_number: "B5792272", item_id: "008243326", serial_id: "h96dt2mcq1gj" },
  { order_number: "B5755769", item_id: "011085135", serial_id: "SJJWDHV9X3G" },
  // ... (the rest of the JSON data)
];

// Initialize empty arrays to store the extracted values
var orderNumbers = [];
var itemIds = [];

// Extract order_number and item_id values using for loop
// gs.info(jsonData.length);
for (var i = 0; i < jsonData.length; i++) {
  // gs.info(jsonData[i]["order_number"]);
  // gs.info(jsonData[i]["item_id"]);

  orderNumbers.push(jsonData[i]["order_number"]);
  itemIds.push(jsonData[i]["item_id"]);
}

// gs.info(orderNumbers);
gs.info(itemIds);

// Print the extracted values

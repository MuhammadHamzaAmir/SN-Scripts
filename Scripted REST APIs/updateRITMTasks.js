var data = request.body.data;

// Required fields validation
var requiredFields = [
  "u_ritm_number",
  "u_order_number",
  "u_hardware_model",
  "u_serial_number",
];

var missingFields = [];

requiredFields.forEach(function (field) {
  if (!data[field] || data[field].toString().trim() === "") {
    missingFields.push(field);
  }
});

if (missingFields.length > 0) {
  var errorResponse = {
    error: "Validation failed. Fields are missing",
  };

  response.setStatus(405);
  response.setBody(errorResponse);
  return;
}

var ritmGr = new GlideRecord("sc_req_item");
ritmGr.addQuery("number", data["u_ritm_number"]);
ritmGr.query();

while (ritmGr.next()) {
  ritmGr.setValue("u_order_number", data["u_order_number"]);
  ritmGr.work_notes = "Order Number: " + data["u_order_number"];
  ritmGr.update();
}

(function execute(inputs, outputs) {
  // ... code ...

  var programs = inputs.programs;
  var dateTypes = inputs.date_types;
  var claimStatus = inputs.claim_status;
  var lossTypes = inputs.loss_types;
  var timeIntervals = inputs.time_intervals;

  var dateMax = inputs.date_max;
  var dateMin = inputs.date_min;

  var json = {
    filters: {
      claims_filters: {
        claim_statuses: "",
        date_max: "",
        date_min: "",
      },
      programs: [],
    },
    options: {
      date_types: [],
      elm: {},
      export_data: "raw",
      loss_types: [],
      time_intervals: [],
    },
  };

  // Add variables to the JSON
  json.filters.claims_filters.claim_statuses = claimStatus;
  json.filters.claims_filters.date_max = "" + dateMax;
  json.filters.claims_filters.date_min = "" + dateMin;
  json.filters.programs = programs.split(",");
  json.options.date_types = dateTypes.split(",");
  json.options.loss_types = lossTypes.split(",");
  json.options.time_intervals = timeIntervals.split(",");

  // Return the updated JSON
  // console.log(json);
  outputs.payload = json;
})(inputs, outputs);

/**
 * @param {params} params
 * @param {api} params.api
 * @param {any} params.event
 * @param {any} params.imports
 * @param {ApiHelpers} params.helpers
 */
function handler({ api, event, helpers, imports }) {
  // console.log("VAlue"+JSON.stringify(api.state.programs));
  var programsIds = api.state.programs.map((e) => e.id);
  console.log(programsIds);

  var elmId = api.state.elm;
  console.log(elmId);

  var dateIds = api.state.date_types.map((i) => i.id);
  console.log(dateIds);

  var lossIds = api.state.loss_types.map((j) => j.id);
  console.log(lossIds);

  var timeIds = api.state.time_intervals.map((k) => k.id);
  console.log(timeIds);

  var startDate = api.state.start_date;
  console.log(startDate);

  var endDate = api.state.end_date;
  console.log(endDate);

  var templateFields =
    "programs=" +
    programsIds +
    "^loss_types=" +
    lossIds +
    "^time_intervals=" +
    timeIds +
    "^elm=" +
    elmId +
    "^date_types=" +
    dateIds +
    "^start_date=" +
    startDate +
    "^end_date=" +
    endDate;
  templateFields = templateFields.toString();
  console.log(templateFields);

  api.data.create_record_1.execute({
    table: "x_889853_demo_app_form_submitter",
    templateFields: templateFields,
    useSetDisplayValue: false,
  });
}

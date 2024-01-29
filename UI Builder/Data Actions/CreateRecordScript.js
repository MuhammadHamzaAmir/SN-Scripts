/**
 * @param {params} params
 * @param {api} params.api
 * @param {any} params.event
 */
function evaluateEvent({ api, event }) {
  var obj = api.state.data_payload;
  obj["options"]["export_data"] = api.state.input_1;
  api.setState("data_payload", obj);
  api.setState("data_payload_string", JSON.stringify(obj));

  var templateFields =
    "description=" +
    api.state.input_1 +
    "^single_data=" +
    api.state.dropdown_value +
    "^json=" +
    api.state.data_payload;
  templateFields = templateFields.toString();

  return {
    table: "x_889853_demo_app_form_submitter",
    templateFields: templateFields,
    useSetDisplayValue: null,
  };
}

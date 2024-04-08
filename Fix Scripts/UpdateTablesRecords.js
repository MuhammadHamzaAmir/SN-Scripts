// https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0813739

var tables = [
  { table: "incident", field: "caller_id" },
  { table: "sc_request", field: "requested_for" },
  { table: "sc_req_item", field: "requested_for" },
  { table: "std_change_proposal", field: "opened_by" },
  { table: "change_request", field: "requested_by" },
  { table: "change_task", field: "change_request.requested_by" },
  { table: "problem", field: "opened_by" },
  { table: "problem_task", field: "problem.opened_by" },
];

for (var i = 0; i < tables.length; i++) {
  var gr = new GlideRecord(tables[i]["table"]);
  gr.query();
  while (gr.next()) {
    gr.setValue("u_msp_company_user", gr.getValue(tables[i]["field"]));
    gr.setWorkflow(false);
    gr.update();
  }
}







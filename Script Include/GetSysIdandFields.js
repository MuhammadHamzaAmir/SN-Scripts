function getSysIdAndFieldsFromTable() {
  var table = this.getParameter("sys_table");
  var query = this.getParameter("sys_query");
  var colArray = this.getParameter("sys_col_array");
  colArray = JSON.parse(colArray);

  var resultArray = [];
  var gr = new GlideRecord(table);
  if (query != null) {
    gr.addEncodedQuery(query);
  }
  gr.orderBy(colArray[0]);
  gr.query();
  while (gr.next()) {
    var currentRec = {};
    currentRec["sys_id"] = gr.getUniqueValue();
    for (i in colArray) {
      currentRec[colArray[i]] = gr.getDisplayValue(colArray[i]);
    }
    resultArray.push(currentRec);
  }
  return JSON.stringify(resultArray);
}
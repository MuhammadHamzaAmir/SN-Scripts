var gr = new GlideRecord("sys_audit");
gr.addEncodedQuery(
  "tablename=<TABLE_NAME>^fieldname=<SPECIFIC_FIELD_NAME_THROUGH_WHICH_ADD_COMMENTS>^documentkey=<SYS_ID_OF_RECORD>"
);
gr.query();

while (gr.next()) {
  gs.info(gr.getValue("newvalue"));
}

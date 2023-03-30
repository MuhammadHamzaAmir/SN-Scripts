// cloning comments
var grAudit = new GlideRecord("sys_audit");
grAudit.addEncodedQuery(
  "tablename=<TABLE>^fieldname=comments^documentkey=" +
    ogDataSetSysId
);
grAudit.query();

if (grAudit.getRowCount() > 0) {
  var comms = "";

  while (grAudit.next()) {
    var user = grAudit.getValue("user");
    var comment = grAudit.getValue("newvalue");

    if (user != "system") {
      var grUser = new GlideRecord("sys_user");
      grUser.addEncodedQuery("user_name=" + user);
      grUser.query();
      grUser.next();

      comms +=
        grUser.getValue("name") +
        ":  " +
        comment +
        " (" +
        grAudit.getDisplayValue('sys_created_on') +
        ")" +
        "\n";
    } else {
      comms += comment;
    }
  }
  record.comments = comms;
}

record.state = "draft";
record.update();

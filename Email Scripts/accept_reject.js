(function runMailScript(
  /* GlideRecord */ current,
  /* TemplatePrinter */ template,
  /* Optional EmailOutbound */
  email,
  /* Optional GlideRecord */ email_action,
  /* Optional GlideRecord */
  event
) {
  // Add your code here

  var ritm = new GlideRecord("sc_req_item");
  ritm.get("" + current.document_id);

  var html = "<p>" + ritm.cat_item.getDisplayValue() + " Details:</p></br>";
  html +=
    "<p>Requested For:" + ritm.requested_for.getDisplayValue() + "</p></br>";
  html += "<p>Reason:" + ritm.variables.license_reason + "</p></br>";

  html += "<p>Start Date:" + ritm.variables.license_start_Date + "</p></br>";
  html += "<p>End Date:" + ritm.variables.license_end_date + "</p></br>";

  html +=
    '<a href="" style="background-color: blueviolet;border: none; color: white; padding: 14px 28px; text-align:center; text-decoration: none; display: inline-block; font-size: 16px;">Accept</a>';

  html +=
    '<a href="" style="background-color: red;border: none;color: white;padding: 14px 28px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin-left: 7px;">Reject</a></br>';

  template.print(html);
})(current, template, email, email_action, event);

// other implementation(more sophoticated)
(function runMailScript(
  /* GlideRecord */ current,
  /* TemplatePrinter */ template,
  /* Optional EmailOutbound */
  email,
  /* Optional GlideRecord */ email_action,
  /* Optional GlideRecord */
  event
) {
  // Add your code here

  var ritm = new GlideRecord("sc_req_item");
  ritm.get("" + current.document_id);

  email.setSubject(ritm.cat_item.getDisplayValue() + " Request");

  var html = "<p>" + ritm.cat_item.getDisplayValue() + " Details:</p></br>";
  html +=
    "<p><span style='font-weight: bold;'>Requested For:</span> " +
    ritm.requested_for.getDisplayValue() +
    "</p></br>";

  // getting all the questions for the catalog item
  var keys = new Array();
  var set = new GlideappVariablePoolQuestionSet();
  set.setRequestID(ritm.sys_id);
  set.load();
  var vs = set.getFlatQuestions();
  for (var i = 0; i < vs.size(); i++) {
    if (
      vs.get(i).getLabel() != "" &&
      !vs.get(i).getLabel().includes("Steven Email")
    ) {
      // gs.log(vs.get(i).getLabel() + " = " + vs.get(i).getDisplayValue() + "\n");
      html +=
        "<p><span style='font-weight: bold;'>" +
        vs.get(i).getLabel() +
        ":</span> " +
        vs.get(i).getDisplayValue() +
        "</p></br>";
    }
  }

  // html += "<p><span style='font-weight: bold;'>Reason:</span> " + ritm.variables.license_reason + "</p></br>";

  // html += "<p><span style='font-weight: bold;'>Start Date:</span> " + ritm.variables.license_start_Date + "</p></br>";
  // html += "<p><span style='font-weight: bold;'>End Date:</span> " + ritm.variables.license_end_date + "</p></br>";

  var emailAcc = new GlideRecord("sys_email_account");
  emailAcc.addEncodedQuery("active=true^type=smtp");
  emailAcc.query();

  var emailAddress = "";
  if (emailAcc.next()) {
    emailAddress = "" + emailAcc.from;
  }

  // html += '<a href="mailto:'+emailAddress+'?subject=Re:'+ritm.number+' - Approve &body='+${sysapproval}+'" style="background-color: blueviolet;border: none; color: white; padding: 14px 28px; text-align:center; text-decoration: none; display: inline-block; font-size: 16px;">Accept</a>';

  // html += '<a href="mailto:'+emailAddress+'?subject=Re:'+ritm.number+' - Reject &body='+${sysapproval}+'" style="background-color: red;border: none;color: white;padding: 14px 28px;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin-left: 7px;">Reject</a></br>';

  template.print(html);
})(current, template, email, email_action, event);

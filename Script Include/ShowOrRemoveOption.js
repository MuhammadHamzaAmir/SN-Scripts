// Script Include
var IncidentsMSPFunctionsClient = Class.create();
IncidentsMSPFunctionsClient.prototype = Object.extendsObject(
  AbstractAjaxProcessor,
  {
    showOrRemoveOption: function () {
      // based on MSP Company
      var callerID = this.getParameter("sysparm_caller_sys_id");
      var userID = this.getParameter("sysparm_user_sys_id");

      var user = new GlideRecord("sys_user");
      user.get(userID);

      if (user.getValue("u_msp_company") != null) {
        return "true";
      } else {
        user.get(callerID);
        if (user.getValue("u_msp_company") != null) {
          return "true";
        }
      }

      return "false";
    },

    type: "IncidentsMSPFunctionsClient",
  }
);

// client Script

function onLoad() {
  //Type appropriate comment here, and begin script below

  var gax = new GlideAjax("IncidentsMSPFunctionsClient");
  gax.addParam("sysparm_name", "showOrRemoveOption");
  gax.addParam("sysparm_caller_sys_id", g_form.getValue("caller_id"));
  gax.addParam("sysparm_user_sys_id", g_user.userID);

  gax.getXML(callbackFunction);

  function callbackFunction(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    if (answer == "true") {
      g_form.removeOption("contact_type", "virtual_agent");
    }
  }
}

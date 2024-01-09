// https://www.servicenow.com/community/sysadmin-forum/perform-server-side-ui-actions-ignoring-required-fields/m-p/2784985/highlight/true#M10482
// Without filling Mandatory Fields
// SCript Include
var CopyIncident = Class.create();
CopyIncident.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  copyIncidentFunc: function () {
    var gr = new GlideRecord("incident");
    gr.setWorkflow(false);
    gr.initialize();
    gr.insert();
    return "" + gr.number;
  },

  type: "CopyIncident",
});

// CLient UI ACTION
function copyIncident() {
  g_form.setMandatory("caller_id", false);
  g_form.setMandatory("short_description", false);

  var gax = new GlideAjax("CopyIncident");
  gax.addParam("sysparm_name", "copyIncidentFunc");

  gax.getXML(callbackFunction);

  function callbackFunction(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
    g_form.addInfoMessage("Incident Created: " + answer);
  }
}

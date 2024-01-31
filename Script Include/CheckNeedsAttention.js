// Client Scripts: CheckNeedsAttention
function onSubmit() {
  //Type appropriate comment here, and begin script below
  var initComms = g_form.getValue("u_comments");
  if (initComms.length > 1) {
    var user = new GlideAjax("CheckNeedsAttention");
    user.addParam("sysparm_name", "setNeedsAttention");
    user.addParam("sysparm_sys_id", g_form.getValue("u_conversion_set"));
    user.getXML(callbackFunction);
    // using
    // gx.getXMLAnswer(callbackFunction);
    // just use in callback function
    // var answer = response
  }

  function callbackFunction(response) {
    var answer = response.responseXML.documentElement.getAttribute("answer");
  }
}





// Script Include : Client Callable
var CheckNeedsAttention = Class.create();
CheckNeedsAttention.prototype = Object.extendsObject(
  global.AbstractAjaxProcessor,
  {
    setNeedsAttention: function () {
      var conSetID = this.getParameter("sysparm_sys_id");
      var grConSet = new GlideRecord("sn_now_analytics_conversion_set");
      grConSet.get(conSetID);
      if (grConSet.getValue("u_needs_attentiom") == "0") {  // 0 = false , 1 = true
        grConSet.setValue("u_needs_attentiom", true);
        grConSet.update();
      }
    },

    type: "CheckNeedsAttention",
  }
);

function onChange(control, oldValue, newValue, isLoading, isTemplate) {
    if (newValue === '') {
        return;
    }

    var gx = new GlideAjax("IncidentsMSPFunctionsClient");
    gx.addParam("sysparm_name", "showOrHideMSPCis");
    gx.addParam("sysparm_user_sys_id", newValue);
    gx.getXMLAnswer(callbackFunction);



}

function callbackFunction(response) {


    if ((response !== null) && (response !== "null")) {
        var json = JSON.parse(response);
        var remove = json["remove"];
        for (var i = 0; i < remove.length; i++) {
            g_form.removeOption("u_msp_cis", remove[i][0]);
        }


        var values = []; //which already exist in the choice field
        var sel = g_form.getElement('u_msp_cis');
        for (var k = 0; k < sel.options.length; k++) {
            if (sel.options[k].value) {
                values.push(sel.options[k].value);
            }
        }


        var keep = json["keep"]; // keep/add
        for (var j = 0; j < keep.length; j++) {
            if (!(values.includes(keep[j][0]))) {
                g_form.addOption("u_msp_cis", keep[j][0], keep[j][1]);
            }
        }
    }


}
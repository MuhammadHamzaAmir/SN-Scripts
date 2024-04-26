var url =
  "incident.do?sys_id=d63eeca697e54610463e5104a253afa3&sysparm_view=major_incidents&sysparm_domain=null&sysparm_domain_scope=null&sysparm_record_row=4&sysparm_record_rows=6&sysparm_record_list=major_incident_state%3dproposed%5eactive%3dtrue%5eu_msp_company_user.companyINc74580ff8708ce90433b0dc6cebb35d9%5eORDERBYDESCnumber";

// Regular expression to match the sys_id parameter in the URL
var sysIdRegex = /[?&]sys_id=([^&]+)/;

// Extract the sys_id from the URL
var match = url.match(sysIdRegex);

// Check if there's a match and get the sys_id value
if (match) {
  var sysId = match[1];
  gs.info("sys_id:" + sysId);
} else {
  gs.log("sys_id not found in the URL.");
}

// 2nd way
// Find the index of 'sys_id='
var startIndex = url.indexOf('sys_id=');

if (startIndex !== -1) {
    // Extract characters after 'sys_id='
    var sysId = url.substring(startIndex + 7); // 7 is the length of 'sys_id='
    
    // Find the index of the next ampersand '&' if exists
    var endIndex = sysId.indexOf('&');
    
    // If ampersand found, extract characters before it
    if (endIndex !== -1) {
        sysId = sysId.substring(0, endIndex);
    }

    gs.log("sys_id:"+ sysId);
} else {
    gs.log("sys_id not found in the URL.");
}




//3rd way
var url = gs.action.getGlideURI().getMap();
var sysId = url.get("sys_id");
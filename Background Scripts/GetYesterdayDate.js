var today = new GlideDateTime();
today.addDays(-1);

var tDateTime = today.getDate();
var enddate = tDateTime + " 23:59:59";

var yDate = new GlideDateTime();
yDate.addDays(-1);

var yDateTime = yDate.getDate();
var strDate = yDateTime + " 00:00:00";

gs.log(strDate + " " + enddate);

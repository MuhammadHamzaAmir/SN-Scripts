var prjNum = "PRJ0010001";
var prjRec = new GlideRecord("pm_project");
prjRec.addEncodedQuery("number=" + prjNum);
prjRec.query();
prjRec.next();

var topPrjTask = new GlideRecord("pm_project_task");
topPrjTask.addEncodedQuery("parent=" + prjRec.sys_id);
topPrjTask.query();

while (topPrjTask.next()) {
  var childPrjTask = new GlideRecord("pm_project_task");
  childPrjTask.initialize();
  childPrjTask.short_description = "2.5 Connectivity Details";
  childPrjTask.parent = topPrjTask.getUniqueValue();
  childPrjTask.insert();
}

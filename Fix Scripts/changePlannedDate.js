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
  childPrjTask.addEncodedQuery("parent=" + topPrjTask.sys_id);
  childPrjTask.addEncodedQuery("short_descriptionLIKEtask 2");
  childPrjTask.query();
  while (childPrjTask.next()) {
    childPrjTask.start_date = "2010-11-01 12:00:00";
    childPrjTask.setWorkflow(false);
    childPrjTask.update();
  }
}

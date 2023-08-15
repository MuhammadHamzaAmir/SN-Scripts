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
  // childPrjTask.addEncodedQuery("short_descriptionLIKEtask 2");
  childPrjTask.orderBy("short_description");
  childPrjTask.query();

  var childTasks = [];
  while (childPrjTask.next()) {
    // childPrjTask.start_date = "2010-11-01 12:00:00";
    // childPrjTask.setWorkflow(false);
    // childPrjTask.update();
    childTasks.push(childPrjTask.getUniqueValue());
  }

  for (var i = 1; i < childTasks.length; i++) {
    var relTaskGr = new GlideRecord("planned_task_rel_planned_task");
    relTaskGr.initialize();
    relTaskGr.parent = childTasks[i - 1];
    relTaskGr.child = childTasks[i];
    relTaskGr.type = "33a57d3d0a0a0b7b00819e4d4402fb14"; // Predecessor of::Successor of
    relTaskGr.setValue("sub_type", "fs");
    relTaskGr.insert();
  }
}

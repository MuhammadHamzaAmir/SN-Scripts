function findAndReplace() {
  var selected = g_list.getChecked().split(",");
  alert(selected);
  var gdw = new GlideDialogWindow("<UI_PAGE_NAME>");
  gdw.setPreference("sys_id", g_form.getUniqueValue());
  gdw.setSize(750, 650);
  gdw.render();
}

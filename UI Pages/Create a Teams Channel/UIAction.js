// client side UI Action

function createChannel() {
  var gdw = new GlideModal("create_ms_teams_channel");
  gdw.setTitle("Create an MS Teams Channel");
  gdw.setPreference("sys_id_major_inc", g_form.getUniqueValue());
  gdw.setPreference("user_id_major_inc", g_user.userID);

  gdw.setSize(700, 500);
  gdw.render();

}

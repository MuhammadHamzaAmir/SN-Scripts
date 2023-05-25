// we will get the value from parent field on child record
var gr = new GlideRecord("u_child_table");
gr.get("5eb7fd5597c72110d7573d400153afd5");
// gs.info(gr.getValue("u_user_ref"));
for (i in gr) gs.info(i + " " + gr[i]);
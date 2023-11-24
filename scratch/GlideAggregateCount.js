var gr = new GlideAggregate("u_shipping_details_azure");
gr.addEncodedQuery(
  "sys_import_set=4e0edd488736f950433b0dc6cebb3592 u_shipping_date>=2023-11-23 00:00:00 u_shipping_date<=2023-11-23 23:59:59 u_item_descriptionLIKEapple ORu_item_descriptionLIKEiphone ORu_item_descriptionLIKEipad ORu_item_descriptionLIKEmacbook u_item_descriptionNOT LIKEcare u_item_descriptionNOT LIKEcase u_item_descriptionNOT LIKEearpods u_item_descriptionNOT LIKEreturn"
);
gr.setGroup(false);
gr.addAggregate("COUNT");
gr.query();

if (gr.next()) {
  gs.info("RECORDS COUNT: " + gr.getAggregate("COUNT"));
}

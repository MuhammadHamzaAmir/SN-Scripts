(function execute(inputs, outputs) {
  // ... code ...

  var payload = [];

  var agg = new GlideAggregate("u_get_asset_data_from_azure_data_lake");
  agg.addAggregate("COUNT");
  agg.addEncodedQuery(
    "u_invoice_onyx_id=100118690^u_record_status=In Progress^u_payload_sent=false^u_master_rmISNOTEMPTY^u_master_rmSTARTSWITHRITM^u_altria_order_type=Bundle^sys_created_onONToday@javascript:gs.beginningOfToday()@javascript:gs.endOfToday()",
  );
  agg.groupBy("u_order_number");
  agg.groupBy("u_master_rm");
  agg.query();

  while (agg.next()) {
    gs.print(
      "Master RM: " +
        agg.u_master_rm +
        " Order Number: " +
        agg.u_order_number +
        " Count: " +
        agg.getAggregate("COUNT"),
    );

    var json = {};
    json["order_number"] = "" + agg.u_order_number;
    json["ritm_number"] = "" + agg.u_master_rm;
    json["count"] = agg.getAggregate("COUNT");

    var recGr = new GlideRecord("u_get_asset_data_from_azure_data_lake");
    recGr.addEncodedQuery(
      "u_invoice_onyx_id=100118690^u_record_status=In Progress^u_payload_sent=false^u_master_rmISNOTEMPTY^u_master_rmSTARTSWITHRITM^u_altria_order_type=Bundle^u_master_rm=" +
        agg.u_master_rm +
        "^u_order_number=" +
        agg.u_order_number,
    );

    recGr.query();

    var orderLines = [];
    while (recGr.next()) {
      var singleOrder = {
        u_carrier: "" + recGr.getValue("u_carrier"),
        u_hardware_model: "" + recGr.getValue("u_description_model"),
        u_requestor_name: "" + recGr.getValue("u_requestor"),
        u_requestor_email: "" + recGr.getValue("u_delivery_contact_e_mail"),
        u_mfg_name: "" + recGr.getValue("u_mfg_name"),
        u_mfg_part_number: "" + recGr.getValue("u_mfg_part_number"),
        u_serial_number: "" + recGr.getValue("u_serial_number"),
        u_ship_address: "" + recGr.getValue("u_ship_address1_h"),
        u_ship_city_h: "" + recGr.getValue("u_ship_city_h"),
        u_ship_date: "" + recGr.getValue("u_ship_date"),
        u_ship_state_h: "" + recGr.getValue("u_ship_state_h"),
        u_tracking_number: "" + recGr.getValue("u_tracking_number"),
        u_product_name: "" + recGr.getValue("u_description_model"),
        u_item_id: "" + recGr.getValue("u_item_id"),
        u_shipping_status: "" + recGr.getValue("u_sales_status_line"),
        u_shipping_quantity: "" + recGr.getValue("u_shipment_quantity"),
        u_model_category: "" + recGr.getValue("u_model_category").trim(),
      };
      orderLines.push(singleOrder);
    }
    json["order_lines"] = orderLines;

    payload.push(json);
  }
  outputs.all_bundle_orders = payload;
  outputs.test = JSON.stringify(payload);
})(inputs, outputs);

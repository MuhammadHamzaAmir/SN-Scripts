var HardwareSubstituteUtil = Class.create();
HardwareSubstituteUtil.prototype = {
  initialize: function () {},

  substituteHardware: function (scTaskSysID, newAssetSysID, newModelSysID) {

        var scTaskGr = new GlideRecord("sc_task");
        scTaskGr.get(scTaskSysID);

        
        scTaskGr.u_asset_model = newModelSysID;
        scTaskGr.u_asset = newAssetSysID;

        var newAssetGr = new GlideRecord("alm_asset");
        newAssetGr.get(newAssetSysID);

        scTaskGr.u_asset_tag = newAssetGr.asset_tag;
        scTaskGr.u_asset_serial_number = newAssetGr.serial_number;

        scTaskGr.update();


        var ritmGr = new GlideRecord("sc_req_item");
        ritmGr.get(scTaskGr.request_item);
        var ritmSysID = ritmGr.sys_id;

        var rqGr = new GlideRecord("sc_request");
        rqGr.get(scTaskGr.request);
        var rfor = rqGr.u_contractor;

        // free the old asset
        var asset = new GlideRecord("alm_asset");
        asset.addQuery("request_line", ritmSysID);
        asset.addQuery("install_status=6^substatus=reserved");
        asset.addQuery("reserved_for", rfor);
        asset.query();
        if (asset.next()) {
          asset.install_status = 6;
          asset.substatus = "available";
          asset.request_line = "";
          asset.reserved_for = "";
          asset.update();
        }

        // reserve the new asset
        newAssetGr.install_status = 6;
        newAssetGr.substatus = "reserved";
        newAssetGr.request_line = ritmSysID;
        newAssetGr.reserved_for = rfor;
        newAssetGr.update();


  },

  getAvailableAssets: function (stockRoom, assetModel) {
    var availableAssets = new GlideRecord("alm_asset");
    availableAssets.addQuery("install_status=6^substatus=available");
    availableAssets.addQuery("stockroom", stockRoom);
    availableAssets.addQuery("model", assetModel);
    availableAssets.query();

    var availableAssetsArr = [];
    while (availableAssets.next()) {
      availableAssetsArr.push(availableAssets.sys_id.toString());
    }
    return availableAssetsArr;

  },

  type: "HardwareSubstituteUtil",
};

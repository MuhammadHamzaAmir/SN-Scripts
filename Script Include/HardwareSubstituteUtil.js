var HardwareSubstituteUtil = Class.create();
HardwareSubstituteUtil.prototype = {
  initialize: function () {},

  substituteHardware: function (scTaskSysID, newAssetSysID, newModelSysID) {

        var scTaskGr = new GlideRecord("sc_task");
        scTaskGr.get(scTaskSysID);

        var oldAsset = scTaskGr.u_asset;
        var oldModel = scTaskGr.u_asset_model;
        
        scTaskGr.u_asset_model = newModelSysID;
        scTaskGr.u_asset = newAssetSysID;

        var newAssetGr = new GlideRecord("alm_asset");
        newAssetGr.get(newAssetSysID);

        scTaskGr.u_asset_tag = newAssetGr.asset_tag;
        scTaskGr.u_asset_serial_number = newAssetGr.serial_number;

        scTaskGr.update();


        var ritm = new GlideRecord("sc_req_item");
        ritm.get(scTaskGr.request_item);
        var rit = ritm.sys_id;

        var rq = new GlideRecord("sc_request");
        rq.get(scTaskGr.request);
        var rfor = rq.u_contractor;

        // free the old asset
        var asset = new GlideRecord("alm_asset");
        asset.addQuery("request_line", rit);
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
        var ast2 = new GlideRecord("alm_asset");
        ast2.addQuery("sys_id", ast);
        ast2.query();
        if (ast2.next()) {
          ast2.install_status = 6;
          ast2.substatus = "reserved";
          ast2.request_line = rit;
          ast2.reserved_for = rfor;
          ast2.update();
        }


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
    return availableAssetsArr.toString();

  },

  type: "HardwareSubstituteUtil",
};

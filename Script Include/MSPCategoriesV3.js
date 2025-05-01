var MSPCategoriesV3 = Class.create();
MSPCategoriesV3.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getCategoriesV3: function () {
    var viewName = this.getParameter("sysparm_view");
    var sys_id = this.getParameter("sysparm_sys_id");
    var Inc = new GlideRecord("incident");
    Inc.get(sys_id);
    var arr = [];

    var user = new GlideRecord("sys_user");
    user.get(gs.getUserID());

    var mspCompanies = user.getValue("u_msp_company");

    if (
      viewName == "msp_view" ||
      viewName == "msp_major_incident" ||
      viewName == "msp_mi_view"
    ) {
      //choices to keep
      var choiceGr = new GlideRecord("sys_choice");
      choiceGr.addEncodedQuery(
        "name=incident^element=category^inactive=false^u_companyIN" +
          mspCompanies
      );
      choiceGr.orderBy("label");
      choiceGr.query();

      var choicesToKeep = [];
      while (choiceGr.next()) {
        choicesToKeep.push([
          choiceGr.getValue("value"),
          choiceGr.getDisplayValue(),
        ]);
      }

      //choices to remove
      // building the query
      var queryRemoval = "";
      var mspCompsArray = mspCompanies.split(",");
      for (var i = 0; i < mspCompsArray.length; i++) {
        queryRemoval += "^u_company!=" + mspCompsArray[i] + "^ORu_company=NULL";
      }

      
      var choiceGrRem = new GlideRecord("sys_choice");

      choiceGrRem.addEncodedQuery(
        "name=incident^element=category^inactive=false" + queryRemoval
      );
      choiceGrRem.orderBy("label");
      

      choiceGrRem.query();

      var choicesToRemove = [];
      
      while (choiceGrRem.next()) {
        choicesToRemove.push([
          choiceGrRem.getValue("value"),
          choiceGrRem.getDisplayValue(),
        ]);
      }

      var res = {};
      res["keep"] = choicesToKeep;
      res["remove"] = choicesToRemove;

      return JSON.stringify(res);
    } else if (viewName == "nterprise_default_view") {
      
      //choices to keep
      var choiceGr = new GlideRecord("sys_choice");
      choiceGr.addEncodedQuery(
        "name=incident^element=category^dependent_value=nterprise^inactive=false"
      );
      choiceGr.orderBy("label");
      choiceGr.query();

      var choicesToKeep = [];
      while (choiceGr.next()) {
        choicesToKeep.push([
          choiceGr.getValue("value"),
          choiceGr.getDisplayValue(),
        ]);
      }

      //choices to remove

      var choiceGrRem = new GlideRecord("sys_choice");
      choiceGrRem.addEncodedQuery(
        "name=incident^element=category^dependent_value!=nterprise^ORdependent_value=NULL^inactive=false"
      );
      choiceGrRem.orderBy("label");
      choiceGrRem.query();

      var choicesToRemove = [];
      while (choiceGrRem.next()) {
        choicesToRemove.push([
          choiceGrRem.getValue("value"),
          choiceGrRem.getDisplayValue(),
        ]);
      }

      var res = {};
      res["keep"] = choicesToKeep;
      res["remove"] = choicesToRemove;

      return JSON.stringify(res);
    } else {
      

      //choices to keep
      var choiceGr = new GlideRecord("sys_choice");
      choiceGr.addEncodedQuery(
        "name=incident^inactive=false^element=category^u_companyISEMPTY^dependent_value!=nterprise^ORdependent_value=NULL"
      );
      choiceGr.orderBy("label");
      choiceGr.query();
      

      var choicesToKeep = [];
      while (choiceGr.next()) {
        choicesToKeep.push([
          choiceGr.getValue("value"),
          choiceGr.getDisplayValue(),
        ]);
      }

      //choices to remove

      var choiceGrRem = new GlideRecord("sys_choice");
      choiceGrRem.addEncodedQuery(
        "name=incident^inactive=false^element=category^u_company!=NULL^ORdependent_value=nterprise"
      );
      choiceGrRem.orderBy("label");
      choiceGrRem.query();
      
      var choicesToRemove = [];
      while (choiceGrRem.next()) {
        choicesToRemove.push([
          choiceGrRem.getValue("value"),
          choiceGrRem.getDisplayValue(),
        ]);
      }

      var res = {};
      res["keep"] = choicesToKeep;
      res["remove"] = choicesToRemove;

      return JSON.stringify(res);
    }
  },

  type: "MSPCategoriesV3",
});

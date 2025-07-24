var IncidentsMSPFunctionsClient = Class.create();
IncidentsMSPFunctionsClient.prototype = Object.extendsObject(
  AbstractAjaxProcessor,
  {
    showOrRemoveOption: function () {
      // based on MSP Company
      var callerID = this.getParameter("sysparm_caller_sys_id");
      var userID = this.getParameter("sysparm_user_sys_id");

      var user = new GlideRecord("sys_user");
      user.get(userID);

      if (user.getValue("u_msp_company") != null) {
        return "true";
      } else {
        user.get(callerID);
        if (user.getValue("u_msp_company") != null) {
          return "true";
        }
      }

      return "false";
    },

    isCallerMSP: function () {
      // can be used to check whether a user is msp user or not
      // based on MSP Company
      var callerID = this.getParameter("sysparm_caller_sys_id");

      var user = new GlideRecord("sys_user");
      user.get(callerID);

      if (user.getValue("u_msp_company") != null) {
        return "true";
      } else {
        return "false";
      }
    },

    getUserMSPCompany: function (userSysID) {
      var callerID = this.getParameter("sysparm_user_sys_id") || userSysID;

      var user = new GlideRecord("sys_user");
      user.get(callerID);

      return user.getValue("u_msp_company");
    },

    getMSPCIsBasedOnMSPCompany: function (mspCompaniesParm) {
      var mspCompanies =
        this.getParameter("sysparm_msp_companies_ids") || mspCompaniesParm;

      //choices to keep
      var choiceGr = new GlideRecord("sys_choice");
      choiceGr.addEncodedQuery(
        "name=incident^element=u_msp_cis^inactive=false^u_companyIN" +
          mspCompanies
      );
      choiceGr.orderBy("sequence");
      choiceGr.query();

      var choicesToKeep = [];
      while (choiceGr.next()) {
        choicesToKeep.push([
          choiceGr.getValue("value"),
          choiceGr.getDisplayValue(),
        ]);
      }

      //choices to remove
      //name=incident^element=u_msp_cis^u_company!=08953c74332b921028b235bb9d5c7b65^ORu_company=NULL^u_company!=522fa220339f161028b235bb9d5c7be6^ORu_company=NULL
      // building the query
      var queryRemoval = "";
      var mspCompsArray = mspCompanies.split(",");
      for (var i = 0; i < mspCompsArray.length; i++) {
        queryRemoval += "^u_company!=" + mspCompsArray[i] + "^ORu_company=NULL";
      }

      choiceGr = new GlideRecord("sys_choice");
      choiceGr.addEncodedQuery(
        "name=incident^element=u_msp_cis^inactive=false" + queryRemoval
      );
      choiceGr.orderBy("sequence");
      choiceGr.query();

      var choicesToRemove = [];
      while (choiceGr.next()) {
        choicesToRemove.push([
          choiceGr.getValue("value"),
          choiceGr.getDisplayValue(),
        ]);
      }

      var res = {};
      res["keep"] = choicesToKeep;
      res["remove"] = choicesToRemove;

      return JSON.stringify(res);
    },

    showOrHideMSPCis: function () {
      var userID = this.getParameter("sysparm_user_sys_id");
      var companies = this.getUserMSPCompany(userID);
      return this.getMSPCIsBasedOnMSPCompany(companies);
    },

    type: "IncidentsMSPFunctionsClient",
  }
);

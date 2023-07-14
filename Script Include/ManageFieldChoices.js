var ManageFieldChoices = Class.create();
ManageFieldChoices.prototype = Object.extendsObject(
  global.AbstractAjaxProcessor,
  {
    removeChoices: function () {
      var field = this.getParameter("field_name");
      var table = this.getParameter("table_name");
      var choicesToKeep = this.getParameter("choices_values").split(",");

      var choicesValues = [];

      var choiceTable = new GlideRecord("sys_choice");
      choiceTable.addEncodedQuery(
        "inactive!=true^name=" + table + "^element=" + field
      );

      for (var i = 0; i < choicesToKeep.length; i++) {
        choiceTable.addEncodedQuery("value!=" + choicesToKeep[i]);
      }
      choiceTable.orderBy("value");

      choiceTable.query();
      while (choiceTable.next()) {
        choicesValues.push(choiceTable.getValue("value"));
      }
      return JSON.stringify(choicesValues);
    },

    addChoices: function () {
      var field = this.getParameter("field_name");
      var table = this.getParameter("table_name");
      var choicesToKeep = this.getParameter("choices_values").split(",");

      var choicesValues = [];

      var choiceTable = new GlideRecord("sys_choice");
      choiceTable.addEncodedQuery(
        "inactive!=true^name=" + table + "^element=" + field
      );

      for (var i = 0; i < choicesToKeep.length; i++) {
        choiceTable.addEncodedQuery("value!=" + choicesToKeep[i]);
      }
      choiceTable.orderBy("sequence");

      choiceTable.query();
      while (choiceTable.next()) {
        var choice = [];
        choice.push(choiceTable.getValue("value"));
        choice.push(choiceTable.getValue("label"));

        choicesValues.push(choice);
      }
      return JSON.stringify(choicesValues);
    },

    type: "ManageFieldChoices",
  }
);

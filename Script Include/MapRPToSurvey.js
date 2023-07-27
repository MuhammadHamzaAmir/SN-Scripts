current.metric_type = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
current.taken_on = gs.nowDateTime();
current.state = "complete";
// gs.info("HAMZA: "+producer.user);

var assesGrp = new GlideRecord("asmt_assessment");
assesGrp.initialize();
assesGrp.metric_type = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
assesGrp.insert();

current.assessment_group = assesGrp.sys_id;

var assesCatRes = new GlideRecord("asmt_category_result");
assesCatRes.initialize();
assesCatRes.category = "02250aa08790fd10433b0dc6cebb35be"; // Feedback Category
assesCatRes.assessment_group = assesGrp.sys_id; // Assessment group
assesCatRes.source_id = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
assesCatRes.metric_type = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
assesCatRes.source_table = "asmt_metric_type";

assesCatRes.rating = 5 * parseInt(producer.query);
assesCatRes.normalized_value = 5 * parseInt(producer.query);
assesCatRes.insert();

var varIds = [];
for (i in producer) {
  // 	gs.info("HAMZA: "+i +" "+producer[i]);

  if (i.startsWith("IO")) {
    // Only Questions
    // Collect Sys IDs of Questions
    varIds.push(i.substring(2));
  }
}
// gs.info("HAMZA: "+producer["issue"]);

// gs.info("HAMZA: "+varIds);

var question = new GlideRecord("item_option_new");
question.addEncodedQuery("sys_idIN" + varIds.join() + "^ORDERBYorder");
question.query();

while (question.next()) {
  var propName = "IO" + question.sys_id.toString();

  if (producer[propName] && !question.map_to_field) {
    // value is filled and not mapped to the table field
    //         gs.info("HAMZA: "+question.question_text +" "+ question.map_to_field+ " "+ question.getDisplayValue("type"));

    var surveyQues = new GlideRecord("asmt_assessment_instance_question");
    surveyQues.initialize();
    surveyQues.source_table = "asmt_metric_type";
    surveyQues.source_id = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
    surveyQues.category = "02250aa08790fd10433b0dc6cebb35be"; // Feedback Category
    surveyQues.instance = current.sys_id; // User Survey

    var quesMetric = new GlideRecord("asmt_metric");
    quesMetric.addEncodedQuery(
      "nameLIKE" +
        question.question_text +
        "^category=02250aa08790fd10433b0dc6cebb35be"
    );
    quesMetric.query();
    quesMetric.next();

    // 		gs.info("HAMZA: in if "+quesMetric.name);

    surveyQues.metric = quesMetric.sys_id; // Question Metric

    var metRes = new GlideRecord("asmt_metric_result");
    metRes.initialize();
    metRes.assessment_group = assesGrp.sys_id; // Assessment group
    metRes.metric = quesMetric.sys_id; // Question Metric
    metRes.setValue("metric.method", "assessment");
    metRes.source_table = "asmt_metric_type";
    metRes.source_id = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
    metRes.user = producer.user;

    if (question.getDisplayValue("type") == "Multiple Choice") {
      surveyQues.value = producer[propName];
      metRes.setValue("metric.datatype", "choice");
      metRes.actual_value = parseInt(producer[propName]);
      metRes.scaled_value = parseInt(producer[propName]);
      metRes.weighted_value = parseInt(producer[propName]);

      metRes.normalized_value = 5 * parseInt(producer[propName]);
      metRes.string_value = producer.getDisplayValue("query");

      var metDef = new GlideRecord("asmt_metric_definition");
      metDef.addEncodedQuery(
        "displayLIKE" +
          producer.getDisplayValue("query") +
          "^metric=7065cea08790fd10433b0dc6cebb3520"
      );
      metDef.query();
      metDef.next();

      metRes.metric_definition = metDef.sys_id;
    } else {
      surveyQues.string_value = producer[propName];
      surveyQues.value = 0;

      metRes.setValue("metric.datatype", "string");
      metRes.actual_value = -1;
      metRes.scaled_value = -1;
      metRes.weighted_value = -1;

      metRes.normalized_value = -1;
      metRes.string_value = producer[propName];
    }

    surveyQues.insert();
    metRes.instance = current.sys_id; // Assessment Instance;
    metRes.instance_question = surveyQues.sys_id; // Assessment Instance Question;
    metRes.insert();
  } else if (!question.map_to_field) {
    // value is not filled and not mapped to the table field
    //         gs.info("HAMZA: "+question.question_text +" "+ question.map_to_field);
    var surveyQues = new GlideRecord("asmt_assessment_instance_question");
    surveyQues.initialize();
    surveyQues.source_table = "asmt_metric_type";
    surveyQues.source_id = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
    surveyQues.category = "02250aa08790fd10433b0dc6cebb35be"; // Feedback Category
    surveyQues.instance = current.sys_id; // User Survey

    var quesMetric = new GlideRecord("asmt_metric");
    quesMetric.addEncodedQuery(
      "nameLIKE" +
        question.question_text +
        "^category=02250aa08790fd10433b0dc6cebb35be"
    );
    quesMetric.query();
    quesMetric.next();
    // 		gs.info("HAMZA: in else if "+quesMetric.name);

    surveyQues.metric = quesMetric.sys_id; // Question Metric

    var metRes = new GlideRecord("asmt_metric_result");
    metRes.initialize();
    metRes.assessment_group = assesGrp.sys_id; // Assessment group
    metRes.metric = quesMetric.sys_id; // Question Metric
    metRes.setValue("metric.method", "assessment");
    metRes.source_table = "asmt_metric_type";

    metRes.source_id = "a915ce608790fd10433b0dc6cebb3591"; // Feedback Survey
    metRes.user = producer.user;

    if (question.getDisplayValue("type") == "Multiple Choice") {
      surveyQues.value = producer[propName];
      metRes.setValue("metric.datatype", "choice");
      metRes.actual_value = parseInt(producer[propName]);
      metRes.scaled_value = parseInt(producer[propName]);
      metRes.weighted_value = parseInt(producer[propName]);

      metRes.normalized_value = 5 * parseInt(producer[propName]);
      metRes.string_value = producer.getDisplayValue("query");

      var metDef = new GlideRecord("asmt_metric_definition");
      metDef.addEncodedQuery(
        "displayLIKE" +
          producer.getDisplayValue("query") +
          "^metric=7065cea08790fd10433b0dc6cebb3520"
      );
      metDef.query();
      metDef.next();

      metRes.metric_definition = metDef.sys_id;
    } else {
      surveyQues.string_value = producer[propName];
      surveyQues.value = 0;

      metRes.setValue("metric.datatype", "string");
      metRes.actual_value = -1;
      metRes.normalized_value = -1;
      metRes.scaled_value = -1;
      metRes.weighted_value = -1;

      metRes.string_value = producer[propName];
    }

    surveyQues.insert();
    metRes.instance = current.sys_id; // Assessment Instance;
    metRes.instance_question = surveyQues.sys_id; // Assessment Instance Question;

    metRes.insert();
  }
}

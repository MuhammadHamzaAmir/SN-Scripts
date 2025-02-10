(function () {
  if (input && input.action === "submitFeedback") {
    try {
      gs.info("Starting feedback submission process.");

      //Initialize and insert Feedback Record
      var feedbackGR = new GlideRecord("sn_hr_sp_employee_center_feedbacks");
      feedbackGR.initialize();
      feedbackGR.u_esc_type = input.feedbackData.type;
      feedbackGR.u_esc_description = input.feedbackData.description;

      var feedbackSysId = feedbackGR.insert();
      if (!feedbackSysId) {
        gs.error("Failed to insert feedback record.");
        data.success = false;
        return;
      }
      gs.info("Feedback record created with SysId: " + feedbackSysId);

      //Handle Attachments
      if (
        input.feedbackData.includeAttachment &&
        input.feedbackData.attachment
      ) {
        if (
          input.feedbackData.attachment.name &&
          input.feedbackData.attachment.data
        ) {
          var attachmentSysId = new GlideSysAttachment();
          attachmentSysId.writeBase64(
            feedbackGR,
            input.feedbackData.attachment.name,
            "application/octet-stream",
            input.feedbackData.attachment.data
          );

          if (attachmentSysId) {
            gs.addInfoMessage(
              "Attachment saved: " + input.feedbackData.attachment.name
            );
          } else {
            gs.addInfoMessage("Failed to save the attachment.");
          }
        } else {
          gs.addInfoMessage("Invalid attachment data.");
        }
      }

      //Handle Snapshots
      if (input.feedbackData.includeSnapshot && input.feedbackData.snapshot) {
        gs.info("Processing snapshot.");

        var snapshotFileName =
          "snapshot_" + new GlideDateTime().getNumericValue() + ".png";
        var snapshotSysId = new GlideSysAttachment();
        snapshotSysId.writeBase64(
          feedbackGR,
          snapshotFileName,
          "image/png",
          input.feedbackData.snapshot
        );

        if (snapshotSysId) {
          gs.info("Snapshot saved successfully.");
        } else {
          gs.error("Failed to save the snapshot.");
        }
      }

      gs.info("Feedback submission completed.");
      data.success = true;
    } catch (error) {
      gs.error("Error during feedback submission: " + error.message);
      data.success = false;
    }
  }
})();

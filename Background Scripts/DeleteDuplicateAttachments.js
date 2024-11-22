// get all the attachments with the count of duplicates only
var attachment = new GlideSysAttachment();

var agr = attachment.getAttachments(
  "incident",
  "57af7aec73d423002728660c4cf6a71c"
);

var dict = {};

while (agr.next()) {
  var count = 0; // counting only the duplicates
  var sysIDs = [];
  if (dict.hasOwnProperty(agr.getValue("hash"))) {
    // check if already exists in the object
    count = dict[agr.getValue("hash")][1] + 1; // increase the counter
    sysIDs = dict[agr.getValue("hash")][0]; // get the Sys IDs array
  } else {
    count = 0;
  }
  sysIDs.push(agr.getValue("sys_id"));

  dict[agr.getValue("hash")] = [sysIDs, count];
}

// delete the duplicate attachments

for (i in dict) {
  // we will only get the attachments where the count is greater than 0
  if (dict[i][1] > 0) {
    for (var j = 0; j < dict[i][1]; j++) {
      // run only to the count
      var attachmentDelete = new GlideSysAttachment();
      var attachmentSysID = dict[i][0][j]; // getting the sys id of the duplicate attachment
      attachmentDelete.deleteAttachment(attachmentSysID);
    }
  }
}

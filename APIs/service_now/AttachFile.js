var tablename = "incident";
var recordSysId = "46ee8c2fa9fe198100623592c70d643e";
var filename = "image.jpeg";

var sm = new sn_ws.RESTMessageV2("Get file from the link", "Default GET");

sm.saveResponseBodyAsAttachment(tablename, recordSysId, filename);

var resp = sm.execute();

var newAttachmentSysId = resp.getResponseAttachmentSysid();
gs.info(newAttachmentSysId);

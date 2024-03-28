// <SYS_ID_USER> MSP Dell itil and knowledge_manager
// <SYS_ID_USER> M ALI NON_MSP with same roles above
// <SYS_ID_USER> MSP Dell and HP with same roles
// <SYS_ID_USER> HP with same roles

var current = new GlideRecord("incident");

var user = new GlideRecord("sys_user");
user.get("<SYS_ID_USER>");
var mspCompany = user.getValue("u_msp_company");
if (mspCompany !== null) {
  current.addEncodedQuery("caller_id.u_msp_companyIN" + mspCompany);
} else {
  current.addEncodedQuery("caller_id.u_msp_companyISEMPTY");
}

// caller_id.u_msp_companyISEMPTY
current.query();

gs.log(current.getRowCount());

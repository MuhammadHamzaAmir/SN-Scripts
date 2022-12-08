function run() {
  var gr = new GlideRecord("sys_dictionary");
  gr.addEncodedQuery(
    "sys_scope=1e30b5658775d91075f2ec280cbb35c4^nameLIKEfpc^sys_name!=C code^ORsys_name=NULL^sys_name!=C description^ORsys_name=NULL^sys_name!=Description^ORsys_name=NULL^sys_name!=Production area^ORsys_name=NULL^sys_name!=V code^ORsys_name=NULL^sys_name!=V description^ORsys_name=NULL"
  );

  gr.query();
  var allData = [
    "country",
    "fpc2471",
    "fpc408",
    "violated_rules",
    "fpc448",
    "fpc520",
    "market_region",
    "market_segment",
    "need_attention",
    "production_area",
  ];

  var log = [];
  while (gr.next()) {
    log.push(gr.getValue("sys_name"));
  }
  // var uniq = log.filter(function(item, pos) {
  // return log.indexOf(item) == pos;
  // });
  return log;
}
run();

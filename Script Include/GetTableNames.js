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

  var foundTables = [];

    for (var i = 0; i < log.length; i++) {
        for (var j = 0; j < allData.length; j++) {
            if (log[i].includes(allData[j]) ) {
                foundTables.push(log[i]);
            }
        }
    }

    var tableNames = [];
    for (var k=0; k < foundTables.length; k++) {
        var gr = new GlideRecord(foundTables[k]);
        tableNames.push(gr.getClassDisplayValue());
    }

    // remove (FPC<number>) from table names
    tableNames = tableNames.map(function (item) {
        return item.replace(/\(FPC\d+\)/g, '');
    });

    //remove fpc<number> elements from allData arary
    allData = allData.filter(function (item) {
        return !item.includes('fpc');
    });

    // add table names to allData array
    allData = allData.concat(tableNames);


  return log;
}
run();


getFpcTablesLabels: function(allData){
		
		var gr = new GlideRecord('sys_dictionary');
		gr.addEncodedQuery('sys_scope=1e30b5658775d91075f2ec280cbb35c4^nameLIKEfpc^sys_name!=Ccode^ORsys_name=NULL^sys_name!=Cdescription^ORsys_name=NULL^sys_name!=Description^ORsys_name=NULL^sys_name!=Productionarea^ORsys_name=NULL^sys_name!=V code^ORsys_name=NULL^sys_name!=V description^ORsys_name=NULL');
		gr.query();  
		var log = [];
		while (gr.next()) {
			log.push(gr.getValue("sys_name"));

		}
		var foundTables = [];

		for (var i = 0; i < log.length; i++) {
			for (var j = 0; j < allData.length; j++) {
				if (log[i].includes(allData[j]) ) {
					foundTables.push(log[i]);
				}
			}
		}
		
		var tableNames = [];
		
		for (var k=0; k < foundTables.length; k++) {
			var grTab = new GlideRecord(foundTables[k]);
			tableNames.push(grTab.getClassDisplayValue());
		}
  
		tableNames = tableNames.map(function (item) {
			return item.replace(/\(FPC\d+\)/g, '');
		});
		
		allData = allData.filter(function (item) {
			return !item.includes('fpc');
		});
  
		allData = allData.concat(tableNames);
		
		var obj = {};
		obj.arrays = allData;
        return JSON.stringify(obj);
	},
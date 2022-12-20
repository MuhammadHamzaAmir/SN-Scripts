function run() {
  var gr = new GlideRecord("sys_dictionary");
  gr.addEncodedQuery(
    "<QUERY>"
  );

  gr.query();
  var allData = [
    "country",
    "<code>",
    "<code>",
    "<code>",
    "<code>",
    "<code>",
    "market_region",
    "market_segment",
    "need_attention",
    "<code>",
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

    tableNames = tableNames.map(function (item) {
        return item.replace(/\(FPC\d+\)/g, '');
    });

    allData = allData.filter(function (item) {
        return !item.includes('fpc');
    });

    // add table names to allData array
    allData = allData.concat(tableNames);


  return log;
}
run();


get<Specific>TablesLabels: function(allData){
		
		var gr = new GlideRecord('sys_dictionary');
		gr.addEncodedQuery('<QUERY>');
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
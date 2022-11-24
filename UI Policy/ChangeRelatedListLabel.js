/**
 * We have to change the Related List Label on that form only. Based on the Base Year field value.
 * Using the UI Macro to get the sum of specifications and setting them in the form.
 */

// UI MACRO
<?xml version="1.0" encoding="utf-8" ?>
<j:jelly trim="false" xmlns:j="jelly:core" xmlns:g="glide" xmlns:j2="null" xmlns:g2="null">

	<body onload="getAllYears()">
		<p id="year1"></p>
		<p id="year2"></p>
		<p id="year3"></p>
		<p id="year4"></p>
		<p id="year5"></p>
		<p id="year6"></p>
		<p id="year7"></p>
		<p id="year8"></p>
		<p id="year9"></p>
		<p id="year10"></p>
	</body>

	<script language="javascript">

		function getAllYears() {
			var baseYear = g_form.getValue("u_base_year");


			var sysID = g_form.getUniqueValue();
			var sumGA = new GlideAjax('GetYearSum');
			sumGA.addParam('sysparm_name', 'GetYearSum');
			sumGA.addParam('sysparm_sys_id', sysID);
			sumGA.getXMLAnswer(callbackFunction);
			
			var sumArr = [];

			function callbackFunction(response) {
				var answer = JSON.parse(response);
				sumArr = answer.arrays;
				var i=1;
				while(i !=11 ){
				if (i == 11){break};
					var elem = document.getElementById("year"+i);
					elem.innerText= "" + (parseInt(baseYear)+i) + " : " + sumArr[i-1] ;
					i = i+1;
				}
			}
		}					   

	</script>

</j:jelly>


// Script Include

var GetYearSum = Class.create();
GetYearSum.prototype = Object.extendsObject(AbstractAjaxProcessor, {

    GetYearSum: function() {
        var sysID = this.getParameter('sysparm_sys_id');
        var gr = new GlideRecord('u_specs_table');

        gr.addQuery('u_collection', sysID);
        gr.query();

        var arr = [];
		
		
        while (gr.next()) {
			for (var i=1;i<11;i++){
				var curr = parseInt(gr.getValue("u_year_"+i));
				if (arr[i] === undefined){
					arr.push(curr);
				}
				else{
					arr[i-1] = arr[i-1] + curr;
				}
				
			}
			
        }
		
		var obj = {};
		obj.arrays = arr;
        return JSON.stringify(obj);
    },



    type: 'GetYearSum'
});

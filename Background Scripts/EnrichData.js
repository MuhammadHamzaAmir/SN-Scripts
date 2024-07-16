var data = "Jerry PEREZ 79148785";

var regex = /([A-Z ]+)(?=#|\d|$)/g;

var matches = data.match(regex);
gs.log(matches);

var wEndDate = new GlideDate();
wEndDate.setValue("2024-05-21");

		wEndDate.addYears(3);

        gs.log(wEndDate.getValue());

var data =
  "7000127564/983668, 72130217560/7932445, 7024237560/791245, 7043517560#70136345 or empty";

var regex = /\b(\d+)(?=[#/])/g;
var matches = data.match(regex);

gs.log(matches); 

var data = "9Q0C7PSL0S#ABA, AS615ABGs2A, E-109100BTX-F1X-06-NA108, MQRXP33LL/C";

var regex = /([^#\s]+)(?=#)/g;

var matches = data.match(regex);
gs.log(matches); // ["9Q0C7PSL0S"]
// No trailing commas and keys should be in inverted commas for thr propertied

var properties = [
  {
    "name": "description",
    "label": "Description",
    "description": "Description Input",
    "readOnly": false,
    "fieldType": "string",
    "mandatory": true,
    "defaultValue": ""
  },
  {
    "name": "single_data",
    "label": "SIngle Data",
    "description": "Single Data Type",
    "readOnly": false,
    "fieldType": "choice",
    "mandatory": false,
    "defaultValue": "dell",
    "typeMetadata": {
      "choices": [
        {
          "label": "Dell",
          "value": "dell"
        },
        {
          "label": "Apple",
          "value": "apple"
        },
        {
          "label": "HP",
          "value": "hp"
        }
      ]
    }
  },
  {
    "name": "multiple_data",
    "label": "Multiple Data",
    "description": "Multiple Data Type",
    "readOnly": false,
    "fieldType": "string",
    "mandatory": true,
    "defaultValue": ""
  }
];

// Script
function transform(input) {
  try {
    var r = new sn_ws.RESTMessageV2(
      "x_889853_demo_app.Demo Data API - Azure Upwork",
      "Create Record"
    );

    //override authentication profile
    //authentication type ='basic'/ 'oauth2'
    //r.setAuthenticationProfile(authentication type, profile name);

    //set a MID server name if one wants to run the message on MID
    //r.setMIDServer('MY_MID_SERVER');

    //if the message is configured to communicate through ECC queue, either
    //by setting a MID server or calling executeAsync, one needs to set skip_sensor
    //to true. Otherwise, one may get an intermittent error that the response body is null
    //r.setEccParameter('skip_sensor', true);

    var json = {};
    json["name"] = input.description;
    gs.info("DATA BROKER: " + input.description);
    gs.info("DATA BROKER: Single Data " + input.single_data);
    gs.info("DATA BROKER: Multiple Data " + input.multiple_data);

    r.setRequestBody(JSON.stringify(json));
    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    var respBody = JSON.parse(responseBody);
    gs.info("DATA BROKER: " + respBody.data);

    return JSON.stringify(respBody.data);
  } catch (ex) {
    var message = ex.message;
  }
}
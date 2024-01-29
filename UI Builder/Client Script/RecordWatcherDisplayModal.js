// Message Received Event on Record Watcher
/**
* @param {params} params
* @param {api} params.api
* @param {any} params.event
* @param {any} params.imports
* @param {ApiHelpers} params.helpers
*/
function handler({api, event, helpers, imports}) {
    console.log(event);
    var apiResponse = event.payload.data.record.api_request_response.value;
    console.log(apiResponse);
    if ((apiResponse != "") || (apiResponse != null)){
        api.setState("modal_header","Success!");
        api.setState("modal_text",apiResponse.error.message);
    }
    else{
        api.setState("modal_header","Something went wrong!");
        api.setState("modal_text","Not working");
    }
    helpers.modal.open("alert_1");
    

}
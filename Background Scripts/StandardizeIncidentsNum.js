 var inc1 = "INC2378718\nINC2379718\nINC1379718";
 var inc2 = "INC2378718, INC2379718,INC1379718";
 var inc3 = "INC2378718 INC2379718 INC1379718 INC1339718INC179718";

 // write a function to transform inc1, inc2 and inc3 separatly to the the format by comma separated
    // inc1=  INC2378718, INC2379718, INC1379718
    // inc2=  INC2378718, INC2379718, INC1379718
    // inc3=  INC2378718, INC2379718, INC1379718, INC1339718, INC179718

function standardizeIncidentsNum(incidents) {
    // remove all the \n if any and replace them by space
    incidents = incidents.replace(/\n/g, " ");
    // remove all the spaces if any and replace them by comma
    incidents = incidents.replace(/ /g, ",");
    // remove all the double commas if any
    incidents = incidents.replace(/,,/g, ",");
    // remove the comma at the end if any
    incidents = incidents.replace(/,$/g, "");
    return incidents;
}



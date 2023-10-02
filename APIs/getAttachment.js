const axios = require("axios");
const fs = require("fs");


const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

(async () => {
  // get the volume source sys id
  let url =
    "https://<INSTANCE_URL>/api/now/table/<TABLE_NAME>";
  const username = "admin";
  const password = "<PASSOWRD";

  let sysId = "90d6ac1087abe11060290ede8bbb35fc";
  let fields = "volume_source";
  let limit = 1;

  let queryParams = {
    sysparm_query: `sys_id=${sysId}`,
    sysparm_fields: fields,
    sysparm_limit: limit,
  };

  var volSrc = "";
  var histDataId = "";
  var progDataId = "";

  var historicData = "";
  var prognosisData = "";

  async function getVolumeSource() {
    await axios
      .get(url, {
        params: queryParams,
        auth: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        volSrc = response.data.result[0].volume_source;
        console.log("Volume Source:", volSrc);
        
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function getVolSrcAtchIds() {
    await getVolumeSource();
    let volSrcId = volSrc;
    url =
      "https://<INSTANCE_URL>/api/now/table/<TABLE_NAME>";
    sysId = volSrcId;
    fields = "historical_data_set,prognosis_data_set";
    limit = 1;
    queryParams = {
      sysparm_query: `sys_id=${sysId}`,
      sysparm_fields: fields,
      sysparm_limit: limit,
    };
    await axios
      .get(url, {
        params: queryParams,
        auth: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
        // console.log("Response:", response.data);
        console.log(
          "Historical Data Set:",
          response.data.result[0].historical_data_set
        );
        console.log(
          "Prognosis Data Set:",
          response.data.result[0].prognosis_data_set
        );
        histDataId = response.data.result[0].historical_data_set;
        progDataId = response.data.result[0].prognosis_data_set;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  await getVolSrcAtchIds();

   async function getHistDataAtch() {
     url =
       "https://<INSTANCE_NAME>/api/now/attachment/" +
       histDataId +
       "/file";
     await axios
       .get(url, {
         responseType: "stream",
         auth: {
           username: username,
           password: password,
         },
       })
       .then((response) => {
         response.data.pipe(
           fs
             .createWriteStream("../Files/historicDataSC.xlsx")
             .on("finish", function () {
               console.log("Historic Data Downloaded");
             })
         ); // this works with responseType: stream
       })
       .catch((error) => {
         console.error("Error:", error);
       });
   }
   await getHistDataAtch();

   async function getProgDataAtch() {
     url = "https://<INSTANCE_NAME>/api/now/attachment/" + progDataId + "/file";

     await axios
       .get(url, {
         responseType: "stream",
         auth: {
           username: username,
           password: password,
         },
       })
       .then((response) => {
         response.data.pipe(
           fs
             .createWriteStream("../Files/progDataSC.xlsx")
             .on("finish", function () {
               console.log("Prognosis Data Downloaded");
             })
         ); // this works with responseType: stream
       })
       .catch((error) => {
         console.error("Error:", error);
       });
   }

   await getProgDataAtch();

})();
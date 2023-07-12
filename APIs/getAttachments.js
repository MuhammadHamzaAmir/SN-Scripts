const axios = require("axios");
const fs = require("fs");


const dotenv = require("dotenv");
dotenv.config({ path: "../.env" });

(async () => {
  // get the volume source sys id
  let url =
    process.env.INSTANCE_BASE_URL+
    "/api/now/table/x_889851_test_hamz_data_set";
  const username = process.env.INSTANCE_USERNAME;
  const password = process.env.INSTANCE_PASSWORD;

  let sysId = "8cabadb307632110ab46f1d08c1ed0a4";
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
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function getVolSrcAtchIds() {
    await getVolumeSource();
    let volSrcId = volSrc.value;
    url =
      process.env.INSTANCE_BASE_URL +
      "/api/now/table/x_889851_test_hamz_volume_source";
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
      process.env.INSTANCE_BASE_URL +
      "/api/now/attachment/" +
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
            .createWriteStream("../Files/historicData.xlsx")
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
    url =
      process.env.INSTANCE_BASE_URL + 
      "/api/now/attachment/" +
      progDataId +
      "/file";

    await axios
      .get(url,{
        responseType: 'stream',
        auth: {
          username: username,
          password: password,
        },
      })
      .then((response) => {
          response.data.pipe(
            fs.createWriteStream("../Files/progData.xlsx").on('finish', function () {
              console.log("Prognosis Data Downloaded");
            })
          );  // this works with responseType: stream

      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  await getProgDataAtch();
})();



const https = require("https");
const fs = require("fs");
var url = "https://d12d-182-191-93-131.in.ngrok.io";



const file = fs.createWriteStream("file.jpeg");
const request = https.get(
  url,
  function (response) {
    response.pipe(file);

    // after download completed close filestream
    file.on("finish", () => {
      file.close();
      console.log("Download Completed");
    });
  }
);

// // create a get rest api to get the file from the server
// https.get(url, (res) => {
//     let data = "";
//     res.setEncoding("hex");
//     res.on("data", (chunk) => {
//         data += chunk;
//     });
//     res.on("end", () => {
//         // console.log(data);
//         // image file is stored in the data variable
//         // write the image file to the disk
//         // fs.writeFile("image.jpeg", data, "binary", (err) => {
//         //     if (err) {
//         //         console.log("Error: " + err.message);
//         //     }
//         //     console.log("File downloaded successfully");
//         // });
//         console.log(data);
//     });
//     }).on("error", (err) => {
//         console.log("Error: " + err.message);
//     });
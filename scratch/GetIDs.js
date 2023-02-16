var arr = [
  "ID: 80df0105-a55e-4374-8814-742346dd6be5\nDescription: Batteries, 24 V\nReference: 2c4492cd-ae82-4cc1-a21e-47900771d093\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 4f5da204-48a7-48b2-8847-eceec4df83d2\nDescription: Centrifugal oil cleaner\nReference: 4db827e8-2fc0-4e6f-b2ee-82efb33564be\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 3df02cd3-29a3-4fe3-84ca-d54f161484ff\nDescription: Retarder\nReference: 899fa698-e711-43e2-81d3-cac3578690b5\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 46d69c83-86b9-4cd9-8302-ae51974f4519\nDescription: Fuel filter\nReference: 65775ac1-5c4e-47fe-bd06-6ce790d3584f\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 55a581a8-5550-4188-a796-14b8997f518a\nDescription: Engine\nReference: 07d88edc-202c-4100-89a5-3b3f1864cfed\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 85d00d25-d3a1-476d-b466-6aae5d8a3b54\nDescription: Valve adjustment\nReference: a0c4f39a-c63e-4d1f-bb49-58043e1afaae\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 2cc6f959-e20c-4d53-8544-35329147df76\nDescription: Basic\nReference: f463b246-8268-427c-b64c-f3dad41b8e31\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: 5dcc876c-6147-482f-86f3-f7995eaa8729\nDescription: brake test\nReference: 3c280e16-0291-435c-b134-402ca2af1fb4\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: e52e9e2d-212c-4a28-841b-c8ee165ade67\nDescription: Chassis lubrication\nReference: f1715dce-63f2-4520-aa9e-0c5bdb7528c8\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: f8aaa528-65ef-4b27-ab15-2697274467c1\nDescription: Software updates\nReference: b11ff4ec-ccc5-4fb2-ba8a-e13a0d8ba872\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "\nID: eb7a7d70-798f-4ef9-92c5-6cb1cb2a49e1\nDescription: Chassis 1\nReference: 76766827-92bb-469c-9be3-cf82eb4302c8\nType: MAINTENANCE\nGeneral BTI Code: \n Main Group:00\n Sub Group: 26\n",
  "",
];

var allIDs = [];

for (var i = 0; i < arr.length; i++) {
    var id = arr[i].match(/ID: (.*)\n/);
    if (id != null)
        allIDs.push(id[1]);
    }

console.log(allIDs);
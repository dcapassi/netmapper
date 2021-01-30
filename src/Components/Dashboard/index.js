var flatten = require("flat");

sites = {
  id: "root",
  name: "Global",
  type: "root",
  children: [
    {
      id: "044358b2-d873-40eb-a37e-cda417980302",
      name: "Brasil",
      children: [
        {
          id: "edec38e8-db6f-4410-8e56-c208b506880f",
          name: "São Paulo",
          children: [
            {
              id: "d2a02699-2695-48ea-a5e5-ff3c434fbade",
              name: "Senac",
              children: [
                {
                  id: "5d94b1e5-dae0-4b6d-b433-5c9beb15a146",
                  name: "Prédio 1",
                  children: [
                    {
                      id: "43d48bf9-68ae-496e-9134-34a8bdc89220",
                      name: "Primeiro Andar",
                      children: [],
                      type: "floor",
                    },
                    {
                      id: "4c1b34dc-54e4-401e-bdfa-4ccf97e1e1f4",
                      name: "Segunda Andar",
                      children: [],
                      type: "floor",
                    },
                  ],
                  type: "building",
                },
              ],
              type: "venue",
            },
            {
              id: "acf7bda8-f0a5-44b6-9c74-a28b23fa0fab",
              name: "Acadêmico 1",
              children: [],
              type: "venue",
            },
          ],
          type: "region",
        },
      ],
      type: "country",
    },
  ],
};

array = [
  {
    key: "8a24d23e-00be-4def-b3ee-b08bda90bd52",
    apName: "ap_net_001",
    posX: 23,
    posY: 42,
    initialX: 23,
    initialY: 42,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 34,
    model: "Cisco/C9120-ax",
    accessSwitch: "36972",
    ipAddress: "1.1.1.1",
  },
  {
    key: "d183e720-9cd7-4a6f-b976-86ed8d273fc4",
    apName: "ap_net_003",
    posX: 89,
    posY: 204,
    initialX: 89,
    initialY: 204,
    apSize: 30,
    label: true,
    channel: "11",
    channel5Ghz: 44,
    model: "Cisco/C9120-ax",
    accessSwitch: "36972",
    ipAddress: "1.1.1.1",
  },
  {
    key: "6fd8cad1-c727-46a4-b49f-52e1bf1b61c5",
    apName: "ap_net_002",
    posX: 89,
    posY: 45,
    initialX: 89,
    initialY: 45,
    apSize: 30,
    label: true,
    channel: "6",
    channel5Ghz: 46,
    model: "Cisco/C9120-ax",
    accessSwitch: "36972",
    ipAddress: "1.1.1.1",
  },
  {
    key: "01a94bf6-974a-4c61-844f-6e347c0b337b",
    apName: "ap_net_004",
    posX: 168,
    posY: 145,
    initialX: 168,
    initialY: 145,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 44,
    model: "Cisco/9117-ax",
    accessSwitch: "36972",
    ipAddress: "1.1.1.1",
  },
  {
    key: "4853d4be-3af8-4be9-9b22-1ab5a65ad82a",
    apName: "ap_net_005",
    posX: 247,
    posY: 146,
    initialX: 247,
    initialY: 146,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 36,
    model: "Cisco/4800",
    accessSwitch: "81c23",
    ipAddress: "1.1.1.1",
  },
  {
    key: "abc18dda-f8ad-435f-abe1-89468f36d138",
    apName: "abc18",
    posX: 252,
    posY: 42,
    initialX: 252,
    initialY: 42,
    apSize: 30,
    label: true,
  },
  {
    key: "bbcaebd9-0873-4262-9913-371661dfd8c8",
    apName: "ap_net_006",
    posX: 343,
    posY: 43,
    initialX: 343,
    initialY: 43,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 38,
    model: "Aruba/518/Outdoor",
    accessSwitch: "36972",
    ipAddress: "1.1.1.1",
  },
  {
    key: "3e2510eb-98c8-4f47-9d4e-42f1250a7eb2",
    apName: "ap_net_008",
    posX: 345,
    posY: 146,
    initialX: 345,
    initialY: 146,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 44,
    model: "Aruba/550",
    accessSwitch: "59a77",
    ipAddress: "1.1.1.1",
  },
  {
    key: "133398ec-1cc6-423f-98ee-84c4cb6c968d",
    apName: "ap_net_010",
    posX: 550,
    posY: 147,
    initialX: 550,
    initialY: 147,
    apSize: 30,
    label: true,
    channel: "1",
    channel5Ghz: 44,
    model: "Aruba/510",
    accessSwitch: "de176",
    ipAddress: "1.1.1.1",
  },
  {
    key: "4795bc62-83cb-42ec-a907-a0a3c06e41b4",
    apName: "4795b",
    posX: 545,
    posY: 40,
    initialX: 545,
    initialY: 40,
    apSize: 30,
    label: true,
  },
];

const getUniqueEntries = (arrayObj, filter) => {
  let result = [];
  const map = new Map();
  for (const item of arrayObj) {
    if (!map.has(item[filter])) {
      map.set(item[filter], true); // set any value to Map
      result.push(item[filter]);
    }
  }

  return result;
};

result = getUniqueEntries(array, "model");

console.log(result);

//
uniqueApsCounted = [];

for (uniqueAp of result) {
  let count = 0;
  for (apArray of array) {
    if (uniqueAp === apArray.model) {
      count = count + 1;
    }
  }
  // Parse the Vendor and the AP type
  if (uniqueAp !== undefined) {
    textSplitted = uniqueAp.split("/");

    uniqueApsCounted.push({
      model: textSplitted[1],
      vendor: textSplitted[0],
      type: textSplitted.length === 3 ? "Outdoor" : "Indoor",
      count,
    });
  } else {
    uniqueApsCounted.push({
      model: "Generic",
      vendor: "Generic",
      type: "Generic",
      count,
    });
  }
}

function findNode(id, currentNode) {
  var i, currentChild, result;

  if (id == currentNode.id) {
    return currentNode;
  } else {
    // Use a for loop instead of forEach to avoid nested functions
    // Otherwise "return" will not work properly
    for (i = 0; i < currentNode.children.length; i += 1) {
      currentChild = currentNode.children[i];

      // Search in the current child
      result = findNode(id, currentChild);

      // Return the result if the node has been found
      if (result !== false) {
        return result;
      }
    }

    // The node has not been found and we have no more options
    return false;
  }
}

console.log(uniqueApsCounted);

console.log(getUniqueEntries(uniqueApsCounted, "vendor"));
console.log(getUniqueEntries(uniqueApsCounted, "type"));

a = findNode("5d94b1e5-dae0-4b6d-b433-5c9beb15a146", sites);

a["children"].map((entry) => {
  console.log(entry.id);
});

import createZabbixApi from "./zabbixAPI";

async function updateHost(
  token,
  zabbixAPI,
  templateList,
  hostGroup,
  hostName,
  hostId,
  ipAddress
) {
  let templateListArray = [];
  templateList.map((entry) => {
    templateListArray.push({ templateid: entry });
  });

  console.log(templateListArray);
  const obj = {
    jsonrpc: "2.0",
    method: "host.update",
    params: {
      hostid: hostId,
      name: hostName,
      templates_clear: templateListArray,
      interfaces: [
        {
          type: 1,
          main: 1,
          useip: 1,
          ip: ipAddress,
          dns: "",
          port: "10050",
        },
      ],
      groups: [
        {
          groupid: hostGroup,
        },
      ],
      inventory_mode: 0,
      inventory: {},
    },
    auth: token,
    id: 1,
  };

  const obj2 = {
    jsonrpc: "2.0",
    method: "host.update",
    params: {
      hostid: hostId,
      templates: templateListArray,
    },
    auth: token,
    id: 1,
  };

  console.log(obj);

  const response = await zabbixAPI
    .post("", obj, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //Enable Templates

      const responseTemplate = zabbixAPI
        .post("", obj2, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .catch((error) => {
          console.log(error);
        });
    })
    .catch((err) => {
      console.log(err);
    });
  return response;
}

export default updateHost;

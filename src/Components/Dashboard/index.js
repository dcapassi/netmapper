import React, { useEffect, useState } from "react";
import apiBackend from "../../API/backend/api";
import View from "./View";
import { Pie } from "react-chartjs-2";

// import { Container } from './styles';

function Dashboard(props) {
  const [dashboardData, setDashboardData] = useState([]);

  const fetchApMapInfo = async (mapIds) => {
    const requests = mapIds.map((mapId) => {
      return getAPs(mapId).then((response) => {
        return response.data.obj;
      });
    });
    return Promise.all(requests);
  };

  useEffect(() => {
    let mapList = [];
    let nameList = [];

    try {
      let node = findNode(props.mapLevelId, props.list);
      let objArray = [];

      node["children"].map((entry) => {
        mapList.push(entry.id);
        nameList.push(entry.name);
      });

      fetchApMapInfo(mapList).then((list) => {
        let indexCount = 0;
        list.map((response) => {
          let result = getUniqueEntries(response, "model");
          let uniqueApsCounted = getUniqueApsCounted(result, response);

          let uniqueVendorList = getUniqueEntries(uniqueApsCounted, "vendor");
          let uniqueVendorCounted = getUniqueItemsCounted(
            uniqueVendorList,
            response,
            "model"
          );

          let apsObj = {};
          uniqueApsCounted.map((entry) => {
            apsObj[entry.model] = entry.count;
          });

          let countOutdoor = getOutdoorAps(response);
          let apType = {
            indoor: response.length - countOutdoor,
            outdoor: countOutdoor,
          };

          let obj = {
            id: mapList[indexCount],
            name: nameList[indexCount],
            uniqueApsCounted: apsObj,
            uniqueVendorCounted,
            apType,
          };

          console.log(obj);
          indexCount += 1;
          objArray.push(obj);
        });
        setDashboardData([...objArray]);
      });
    } catch {}
  }, []);

  const getAPs = async (mapId) => {
    const data = await apiBackend.get(`/aps/${mapId}`, {});
    return data;
  };

  const getOutdoorAps = (apArray, text = "/Outdoor") => {
    let count = 0;
    apArray.map((entry) => {
      if (entry.model.includes(text) === true) {
        count++;
      }
    });
    return count;
  };

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

  function getUniqueApsCounted(result, array) {
    let uniqueApsCounted = [];
    let uniqueAp;

    for (uniqueAp of result) {
      let count = 0;
      let apArray;
      for (apArray of array) {
        if (uniqueAp === apArray.model) {
          count = count + 1;
        }
      }
      // Parse the Vendor and the AP type
      if (uniqueAp !== undefined) {
        let textSplitted = uniqueAp.split("/");

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
    return uniqueApsCounted;
  }

  function getUniqueItemsCounted(uniqueList, fullList, type) {
    let uniqueItemsCounted = {};
    let uniqueAp;

    for (uniqueAp of uniqueList) {
      let count = 0;
      let apArray;
      for (apArray of fullList) {
        if (apArray[type] !== undefined) {
          if (type === "model" && uniqueAp === apArray[type].split("/")[0]) {
            count = count + 1;
          }
        }
      }

      uniqueItemsCounted[uniqueAp] = count;
    }
    return uniqueItemsCounted;
  }



  return (
    <>
      <View dashboardData={dashboardData} />
    </>
  );
}

export default Dashboard;

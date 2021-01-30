import React, { useEffect } from "react";
import apiBackend from "../../API/backend/api";

// import { Container } from './styles';

function Dashboard(props) {
  useEffect(() => {
    /*     //Temporary for Tshoot only
    console.log("Lista");
    console.log(props.list);
    console.log("Id:");
    console.log(props.mapLevelId);
    console.log("Name:");
    console.log(props.mapLevelName); */

    try {
      let node = findNode(props.mapLevelId, props.list);

      console.log("Id das Childs");
      node["children"].map((entry) => {
        console.log(entry.id + " " + entry.name);

        getAPs(entry.id)
          .then((reply) => {
            console.log(reply.data.obj);

            let result = getUniqueEntries(reply.data.obj, "model");
            let uniqueApsCounted = getUniqueApsCounted(result, reply.data.obj);
            console.log(uniqueApsCounted);

            let uniqueVendorList = getUniqueEntries(uniqueApsCounted, "vendor");
            let uniqueVendorCounted = getUniqueItemsCounted(
              uniqueVendorList,
              reply.data.obj,
              "model"
            );
            console.log(uniqueVendorCounted);

            let countOutdoor = getOutdoorAps(reply.data.obj);
            let apType = {
              indoor: reply.data.obj.length - countOutdoor,
              outdoor: countOutdoor,
            };
            console.log(apType);
          })
          .catch((reply) => {
            console.log(reply);
          });
      });
    } catch {
      console.log("erro mas segueiu o jogo");
    }
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
    let uniqueItemsCounted = [];
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

      uniqueItemsCounted.push({
        name: uniqueAp,
        count,
      });
    }
    return uniqueItemsCounted;
  }

  return <div />;
}

export default Dashboard;

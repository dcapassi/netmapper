import React, { useState, useEffect } from "react";
import AccessPoint from "./AccessPoint";
import { zoomFitCalc } from "../../Utils/index";
import { v4 } from "uuid";
import DeviceEditBox from "../DeviceEditBox/DeviceEditBox";

function AccessPointContainer(props) {
  //To be received
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;

  const [apSize, setApSize] = useState(30);

  //UseEffect for loading the Access Points
  useEffect(() => {
    const apsFromLocalStorage = JSON.parse(localStorage.getItem("venue1area1"));

    if (apsFromLocalStorage !== null) {
      const obj = apsFromLocalStorage.map((entry) => {
        return { ...entry, posX: entry.initialX, posY: entry.initialY };
      });
      setArrayAps(obj);
    }
  }, []);

  //Access Points Array
  const [arrayAps, setArrayAps] = useState([]);

  useEffect(() => {
    localStorage.setItem("venue1area1", JSON.stringify(arrayAps));
  }, [arrayAps]);

  const [editElement, setEditElement] = useState({
    visible: false,
    elementName: "noname",
    posX: null,
    posY: null,
  });

  useEffect(() => {
    props.sendApUpdatedList(arrayAps);
  }, [arrayAps]);

  //Access Points properties to control de dragging
  const [apMoveSettings, setApMoveSettings] = useState({
    movingMode: false,
    currentMapX: MAP_WIDTH,
    currentMapY: MAP_HEIGHT,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMouseY: 0,
    posX: 0,
    posY: 0,
    movingAp: "",
  });

  const closeBox = () => {
    setEditElement({ ...editElement, visible: false });
    props.messageCallBack({ edit: { isEditing: false } });
  };

  const getEditFields = (apObj) => {
    let newArray = [...arrayAps];

    try {
      const key = newArray.findIndex((obj) => {
        return obj.apName === apObj.targetElement;
      });
      newArray[key] = {
        ...newArray[key],
        apName: apObj.apName,
        channel: apObj.channel24G,
        channel5Ghz: apObj.channel5G,
        customer: apObj.customer,
        model: apObj.model,
      };
    } catch (error) {
      console.log(error);
    }
    setArrayAps(newArray);
  };
  //Function passed to each AP as a callback.
  //The AP sends the Event and the ApId to be handled by this container
  //Checks if the mode.moveAps is true
  //It toggles the "isMoving"
  //Pass the apId to the movingAp
  //
  const apDragAction = (event, ap) => {
    if (props.mode.clickMode) {
      let { left, top } = props.refMap.current.getBoundingClientRect();
      props.messageCallBack({ edit: { isEditing: true } });

      setEditElement({
        ...editElement,
        visible: true,
        elementName: ap,
        posX: event.clientX - left,
        posY: event.clientY - top,
      });
    }
    if (props.mode.moveAp) {
      if (!apMoveSettings.isMoving) {
        setApMoveSettings({
          ...apMoveSettings,
          isMoving: true,
          movingAp: ap,
          initialMouseX: event.clientX,
          initialMouseY: event.clientY,
        });
        props.messageCallBack({ ap: { isMoving: true } });
      } else {
        setApMoveSettings({
          ...apMoveSettings,
          isMoving: false,
          movingAp: ap,
        });
        props.messageCallBack({ ap: { isMoving: false } });
      }
    }
  };

  const handleZoom = (zoomType) => {
    let zoomFactor = 0;
    let offset1 = 0;
    let offset2 = 0;
    switch (zoomType) {
      case "ZoomIn":
        zoomFactor = props.zoomLevel.zoomInFactor;
        offset1 = (apSize / 2) * (zoomFactor - 1);
        offset2 = 0;
        break;
      case "ZoomOut":
        zoomFactor = props.zoomLevel.zoomOutFactor;
        offset1 = 0;
        offset2 = ((-1 * apSize) / 2) * (1 / props.zoomLevel.zoomOutFactor - 1);
        break;
      case "Fit":
        setArrayAps(
          arrayAps.map((entry) => {
            return {
              ...entry,
              posX: entry.initialX,
              posY: entry.initialY,
            };
          })
        );

        setApMoveSettings({
          ...apMoveSettings,
          currentMapY: MAP_HEIGHT,
          currentMapX: MAP_WIDTH,
        });
        return;
        break;
      default:
        break;
    }

    let mapHeightUpdated = props.mapMoveSettings.mapHeigth * zoomFactor;
    let mapWidthUpdated = props.mapMoveSettings.mapWidth * zoomFactor;

    setApMoveSettings({
      ...apMoveSettings,
      currentMapY: mapHeightUpdated,
      currentMapX: mapWidthUpdated,
    });

    setArrayAps(
      arrayAps.map((entry) => {
        return {
          ...entry,
          posX: (entry.posX + offset2) * zoomFactor + offset1,
          posY: (entry.posY + offset2) * zoomFactor + offset1,
        };
      })
    );
  };

  //UseEffect for updating the AP posion in case of a "Zoom" event
  useEffect(() => {
    if (props.zoomLevel.type) {
      handleZoom(props.zoomLevel.type);
    }
  }, [props.zoomLevel]);

  //UseEffect for updating the AP posion in case of a move Event
  useEffect(() => {
    if (apMoveSettings.isMoving && props.mode.moveAp) {
      const key = arrayAps.findIndex((obj) => {
        return obj.apName === apMoveSettings.movingAp;
      });

      {
        if (apMoveSettings.isMoving) {
          let { left, top } = props.refMap.current.getBoundingClientRect();
          let newPosX = props.mouseMoveEvent.x - left - apSize / 2;
          let newPosY = props.mouseMoveEvent.y - top - apSize / 2;
          const { x: calcInitialX, y: calcInitialY } = zoomFitCalc(
            newPosX,
            newPosY,
            (apSize / 2) * (props.zoomLevel.zoomInFactor - 1),
            props.zoomLevel.zoomOutFactor,
            props.zoomLevel.level - 1
          );

          try {
            arrayAps[key].posX = newPosX;
            arrayAps[key].posY = newPosY;
            arrayAps[key].channel = null;
            arrayAps[key].channel5G = null;
            arrayAps[key].customer = null;
            setArrayAps([...arrayAps]);
          } catch (error) {
            console.log(error);
          }
          try {
            arrayAps[key].initialX = calcInitialX;
            arrayAps[key].initialY = calcInitialY;
            setArrayAps([...arrayAps]);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }
  }, [props.mouseMoveEvent]);

  //UseEffect for handling click events
  useEffect(() => {
    let { left, top } = props.refMap.current.getBoundingClientRect();
    let newPosX = props.mapClickEvent.x - left - apSize / 2;
    let newPosY = props.mapClickEvent.y - top - apSize / 2;

    if (props.mode.addAp) {
      const { x: calcInitialX, y: calcInitialY } = zoomFitCalc(
        newPosX,
        newPosY,
        (apSize / 2) * (props.zoomLevel.zoomInFactor - 1),
        props.zoomLevel.zoomOutFactor,
        props.zoomLevel.level - 1
      );

      try {
        let obj = {
          apName: v4().substring(0, 5),
          posX: newPosX,
          posY: newPosY,
          initialX: calcInitialX,
          initialY: calcInitialY,
          apSize: 30,
          label: true,
        };
        setArrayAps([...arrayAps, obj]);
        localStorage.setItem("venue1area1", JSON.stringify(arrayAps));
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.mapClickEvent]);

  return (
    <>
      {editElement.visible && (
        <DeviceEditBox
          closeBox={closeBox}
          setEditField={getEditFields}
          editElement={editElement}
        />
      )}
      {arrayAps !== [] &&
        arrayAps.map((entry) => {
          return (
            <AccessPoint
              dragAction={apDragAction}
              apName={entry.apName}
              posX={entry.posX}
              posY={entry.posY}
              apSize={apSize}
              label={entry.label}
              key={entry.apName}
              initialMapSizeY={props.MAP_HEIGHT}
              initialMapSizeX={props.MAP_WIDTH}
              isMoving={apMoveSettings.isMoving}
            />
          );
        })}
    </>
  );
}

export default AccessPointContainer;

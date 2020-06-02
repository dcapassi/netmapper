import React, { useState, useEffect } from "react";
import Switch from "./Switch";
import { zoomFitCalc } from "../../Utils/index";
import { v4 } from "uuid";
import DeviceEditBox from "../DeviceEditBox/DeviceEditBox";

function SwitchContainer(props) {
  //To be received
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;
  const [switchSize, setswitchSize] = useState(30);

  //UseEffect for loading the Access Points
  useEffect(() => {
    const apsFromLocalStorage = JSON.parse(localStorage.getItem("venue1area1"));

    if (apsFromLocalStorage !== null) {
      const obj = apsFromLocalStorage.map((entry) => {
        return { ...entry, posX: entry.initialX, posY: entry.initialY };
      });
      setArraySwitches(obj);
    }
  }, []);

  //Switches Array
  const [arraySwitches, setArraySwitches] = useState([]);

  useEffect(() => {
    localStorage.setItem("venue1area1", JSON.stringify(arraySwitches));
  }, [arraySwitches]);

  const [editElement, setEditElement] = useState({
    visible: false,
    elementName: "noname",
    posX: null,
    posY: null,
  });

  useEffect(() => {
    props.sendSwitchesUpdatedList(arraySwitches);
  }, [arraySwitches]);

  //Access Points properties to control de dragging
  const [SwitchMoveSettings, setSwitchMoveSettings] = useState({
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
    movingSwitch: "",
  });

  const closeBox = () => {
    setEditElement({ ...editElement, visible: false });
    props.messageCallBack({ edit: { isEditing: false } });
  };

  const getEditFields = (apObj) => {
    let newArray = [...arraySwitches];

    try {
      const key = newArray.findIndex((obj) => {
        return obj.switchName === apObj.targetElement;
      });
      newArray[key] = {
        ...newArray[key],
        switchName: apObj.switchName,
        channel: apObj.channel24G,
        channel5Ghz: apObj.channel5G,
        customer: apObj.customer,
        model: apObj.model,
      };
    } catch (error) {
      console.log(error);
    }
    setArraySwitches(newArray);
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
      if (!SwitchMoveSettings.isMoving) {
        setSwitchMoveSettings({
          ...SwitchMoveSettings,
          isMoving: true,
          movingAp: ap,
          initialMouseX: event.clientX,
          initialMouseY: event.clientY,
        });
        props.messageCallBack({ switch: { isMoving: true } });
      } else {
        setSwitchMoveSettings({
          ...SwitchMoveSettings,
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
        offset1 = (switchSize / 2) * (zoomFactor - 1);
        offset2 = 0;
        break;
      case "ZoomOut":
        zoomFactor = props.zoomLevel.zoomOutFactor;
        offset1 = 0;
        offset2 =
          ((-1 * switchSize) / 2) * (1 / props.zoomLevel.zoomOutFactor - 1);
        break;
      case "Fit":
        setArraySwitches(
          arraySwitches.map((entry) => {
            return {
              ...entry,
              posX: entry.initialX,
              posY: entry.initialY,
            };
          })
        );

        setSwitchMoveSettings({
          ...SwitchMoveSettings,
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

    setSwitchMoveSettings({
      ...SwitchMoveSettings,
      currentMapY: mapHeightUpdated,
      currentMapX: mapWidthUpdated,
    });

    setArraySwitches(
      arraySwitches.map((entry) => {
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
    if (SwitchMoveSettings.isMoving && props.mode.moveAp) {
      const key = arraySwitches.findIndex((obj) => {
        return obj.switchName === SwitchMoveSettings.movingAp;
      });

      {
        if (SwitchMoveSettings.isMoving) {
          let { left, top } = props.refMap.current.getBoundingClientRect();
          let newPosX = props.mouseMoveEvent.x - left - switchSize / 2;
          let newPosY = props.mouseMoveEvent.y - top - switchSize / 2;
          const { x: calcInitialX, y: calcInitialY } = zoomFitCalc(
            newPosX,
            newPosY,
            (switchSize / 2) * (props.zoomLevel.zoomInFactor - 1),
            props.zoomLevel.zoomOutFactor,
            props.zoomLevel.level - 1
          );

          try {
            arraySwitches[key].posX = newPosX;
            arraySwitches[key].posY = newPosY;
            arraySwitches[key].channel = null;
            arraySwitches[key].channel5G = null;
            arraySwitches[key].customer = null;
            setArraySwitches([...arraySwitches]);
          } catch (error) {
            console.log(error);
          }
          try {
            arraySwitches[key].initialX = calcInitialX;
            arraySwitches[key].initialY = calcInitialY;
            setArraySwitches([...arraySwitches]);
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
    let newPosX = props.mapClickEvent.x - left - switchSize / 2;
    let newPosY = props.mapClickEvent.y - top - switchSize / 2;

    if (props.mode.addSwitch) {
      const { x: calcInitialX, y: calcInitialY } = zoomFitCalc(
        newPosX,
        newPosY,
        (switchSize / 2) * (props.zoomLevel.zoomInFactor - 1),
        props.zoomLevel.zoomOutFactor,
        props.zoomLevel.level - 1
      );

      try {
        let obj = {
          switchName: v4().substring(0, 5),
          posX: newPosX,
          posY: newPosY,
          initialX: calcInitialX,
          initialY: calcInitialY,
          switchSize: 30,
          label: true,
        };
        setArraySwitches([...arraySwitches, obj]);
        localStorage.setItem("venue1area1", JSON.stringify(arraySwitches));
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
      {arraySwitches !== [] &&
        arraySwitches.map((entry) => {
          return (
            <Switch
              dragAction={apDragAction}
              switchName={entry.switchName}
              posX={entry.posX}
              posY={entry.posY}
              switchSize={switchSize}
              label={entry.label}
              key={entry.switchName}
              initialMswitchSizeY={props.MAP_HEIGHT}
              initialMswitchSizeX={props.MAP_WIDTH}
              isMoving={SwitchMoveSettings.isMoving}
            />
          );
        })}
    </>
  );
}

export default SwitchContainer;

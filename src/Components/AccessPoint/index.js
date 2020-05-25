import React, { useState, useEffect } from "react";
import AccessPoint from "./AccessPoint";
import { zoomFitCalc } from "../../Utils/index";
import { v4 } from "uuid";

function AccessPointContainer(props) {
  //To be received
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;

  const [apSize, setApSize] = useState(30);

  //Access Points Array
  const [arrayAps, setArrayAps] = useState([
    {
      apName: "AP001",
      posX: 100,
      posY: 100,
      apSize: 30,
      label: true,
      initialX: 100,
      initialY: 100,
    },
    {
      apName: "AP002",
      posX: 800,
      posY: 100,
      apSize: 30,
      label: true,
      initialX: 800,
      initialY: 100,
    },
  ]);

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

  //Function passed to each AP as a callback.
  //The AP sends the Event and the ApId to be handled by this container
  //Checks if the mode.moveAps is true
  //It toggles the "isMoving"
  //Pass the apId to the movingAp
  //
  const apDragAction = (event, ap) => {
    if (props.mode.moveAp) {
      if (!apMoveSettings.isMoving) {
        console.log("Drag Action: " + ap);
        setApMoveSettings({
          ...apMoveSettings,
          isMoving: true,
          movingAp: ap,
          initialMouseX: event.clientX,
          initialMouseY: event.clientY,
        });
      } else {
        setApMoveSettings({
          ...apMoveSettings,
          isMoving: false,
          movingAp: ap,
        });
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
        console.log(zoomFactor);
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
    console.log("Offset2:______" + offset2);

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
      } catch (error) {
        console.log(error);
      }
    }
  }, [props.mapClickEvent]);

  return (
    <>
      {arrayAps.map((entry) => {
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

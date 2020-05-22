import React, { useState, useRef, useEffect } from "react";
import img from "./img/blueprint.png";
import AccessPoint from "../AccessPoint";
import { Container, MapContainer } from "./styles";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import { v4 } from "uuid";
import { getDistance, pixelToMeter } from "../../Utils";

export default function AppMap() {
  const refMap = useRef(null);
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;
  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: false,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMouseY: 0,
    posX: 0,
    posY: 0,
    mapHeigth: MAP_HEIGHT,
    mapWidth: MAP_WIDTH,
  });

  const [zoomLevel, setZoomLevel] = useState({
    level: 1,
  });

  const [scaleSettings, setScaleSettings] = useState({
    point1: { x: null, y: null },
    point2: { x: null, y: null },
    measuredMapWidth: mapMoveSettings.mapWidth,
    distance: 58,
    pixelToMeter: 10,
    mapWidthMeter: (10 * 1700) / 58, // 10 is the measure in meters informed by the user
  });

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

  const [arrayAps, setArrayAps] = useState([
    {
      apName: "AP001",
      posX: 0,
      posY: 100,
      apSize: 30,
      label: true,
      initialX: 30,
      initialY: 30,
    },
    {
      apName: "AP002",
      posX: 800,
      posY: 100,
      apSize: 30,
      label: true,
      initialX: 100,
      initialY: 110,
    },
  ]);

  const [mode, setMode] = useState({
    zoomIn: false,
    zoomOut: false,
    addAp: false,
    measureDistance: false,
    moveMap: false,
    moveAp: false,
  });

  const apDragAction = (event, ap) => {
    if (!apMoveSettings.isMoving && mode.moveAp) {
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
  };
  const handleMenuAction = (type) => {
    const ZoomInFactor = 1.1;
    const ZoomOutFactor = 1 / ZoomInFactor;

    switch (type) {
      case "ZoomIn":
        if (zoomLevel.level <= 20) {
          setZoomLevel({ ...zoomLevel, level: zoomLevel.level + 1 });
          let mapHeightUpdated = mapMoveSettings.mapHeigth * ZoomInFactor;
          let mapWidthUpdated = mapMoveSettings.mapWidth * ZoomInFactor;

          setMapMoveSettings({
            ...mapMoveSettings,
            mapHeigth: mapHeightUpdated,
            mapWidth: mapWidthUpdated,
          });

          setApMoveSettings({
            ...apMoveSettings,
            currentMapY: mapHeightUpdated,
            currentMapX: mapWidthUpdated,
          });

          setArrayAps(
            arrayAps.map((entry) => {
              return {
                ...entry,
                posX: entry.posX * ZoomInFactor,
                posY: entry.posY * ZoomInFactor,
              };
            })
          );
        }
        break;
      case "ZoomOut":
        if (zoomLevel.level > 1) {
          let mapHeightUpdated = mapMoveSettings.mapHeigth * ZoomOutFactor;
          let mapWidthUpdated = mapMoveSettings.mapWidth * ZoomOutFactor;
          setZoomLevel({ ...zoomLevel, level: zoomLevel.level - 1 });
          setMapMoveSettings({
            ...mapMoveSettings,
            mapHeigth: mapHeightUpdated,
            mapWidth: mapWidthUpdated,
          });

          setApMoveSettings({
            ...apMoveSettings,
            currentMapY: mapHeightUpdated,
            currentMapX: mapWidthUpdated,
          });
          setArrayAps(
            arrayAps.map((entry) => {
              return {
                ...entry,
                posX: entry.posX * ZoomOutFactor,
                posY: entry.posY * ZoomOutFactor,
              };
            })
          );
        }
        break;
      case "Fit":
        if (zoomLevel.level > 1) {
          setZoomLevel({ ...zoomLevel, level: 1 });
          setMapMoveSettings({
            ...mapMoveSettings,
            isMoving: false,
            initialPosX: 0,
            initialPosY: 0,
            initialMouseX: 0,
            initialMousey: 0,
            posX: 0,
            posY: 0,
            mapHeigth: MAP_HEIGHT,
            mapWidth: MAP_WIDTH,
          });
          setArrayAps(
            arrayAps.map((entry) => {
              return {
                ...entry,
                posX: entry.initialX,
                posY: entry.initialY,
              };
            })
          );
        }
        break;
      case "Mouse":
        setMode({
          ...mode,
          addAp: false,
          moveAp: false,
          moveMap: true,
          measureDistance: false,
        });
        setApMoveSettings({
          ...apMoveSettings,
          isMoving: false,
        });
        break;
      case "Move":
        if (!apMoveSettings.isMoving && !mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            moveAp: true,
            moveMap: false,
            measureDistance: false,
          });
        }
        break;
      case "addAp":
        if (!apMoveSettings.isMoving && !mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: true,
            moveAp: false,
            moveMap: false,
            measureDistance: false,
          });
        }
        break;
      case "Ruler":
        if (!apMoveSettings.isMoving && !mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            moveAp: false,
            moveMap: false,
            measureDistance: true,
          });
        }
        break;
      default:
    }
  };

  return (
    <Container>
      <TopMenu
        menuAction={handleMenuAction}
        visible={apMoveSettings.isMoving}
      />
      <SideMenu
        menuAction={handleMenuAction}
        visible={apMoveSettings.isMoving}
      />

      <MapContainer
        ref={refMap}
        onClick={(e) => {
          e.preventDefault();
          let { left, top } = refMap.current.getBoundingClientRect();
          let newPosX = e.clientX - left;
          let newPosY = e.clientY - top;

          if (mode.measureDistance) {
            if (
              scaleSettings.point1.x === null &&
              scaleSettings.point1.y === null
            ) {
              console.log("got here!");
              try {
                setScaleSettings({
                  ...scaleSettings,
                  point1: { x: newPosX, y: newPosY },
                  point2: { x: newPosX, y: newPosY },
                });
              } catch (error) {
                console.log(error);
              }
              return true;
            }
            if (
              scaleSettings.point2.x === null &&
              scaleSettings.point2.y === null
            ) {
              try {
                setScaleSettings({
                  ...scaleSettings,
                  point2: { x: newPosX, y: newPosY },
                });
              } catch (error) {
                console.log(error);
              }
            }
          }

          if (mode.addAp) {
            console.log("Clicked!");
            try {
              let obj = {
                apName: v4().substring(0, 5),
                posX: newPosX,
                posY: newPosY,
                initialX: (newPosX * MAP_WIDTH) / apMoveSettings.currentMapX,
                initialY: (newPosY * MAP_HEIGHT) / apMoveSettings.currentMapY,
                apSize: 30,
                label: true,
              };
              setArrayAps([...arrayAps, obj]);
            } catch (error) {
              console.log(error);
            }
          }
        }}
        onMouseDown={(e) => {
          if (mode.measureDistance) {
          }
          if (mode.addAp) {
            return false;
          }
          if (mode.moveMap) {
            e.preventDefault();
            if (mapMoveSettings !== true) {
              {
                setMapMoveSettings({
                  ...mapMoveSettings,
                  isMoving: true,
                  initialMouseX: e.clientX,
                  initialMouseY: e.clientY,
                  initialPosX: mapMoveSettings.posX,
                  initialPosY: mapMoveSettings.posY,
                });
              }
            }
          }
        }}
        onMouseUp={(e) => {
          e.stopPropagation();
          if (mode.addAp) {
            return false;
          }
          if (apMoveSettings.isMoving === true) {
            setApMoveSettings({
              ...apMoveSettings,
              isMoving: false,
            });
          }
          if (mapMoveSettings.isMoving === true) {
            setMapMoveSettings({
              ...mapMoveSettings,
              isMoving: false,
            });
          }
        }}
        onMouseMove={(e) => {
          // Measure mode second point follow the mouse;
          if (mode.measureDistance) {
            let { left, top } = refMap.current.getBoundingClientRect();
            let newPosX = e.clientX - left;
            let newPosY = e.clientY - top;
            if (
              scaleSettings.point1.x !== null &&
              scaleSettings.point1.y !== null
            ) {
              try {
                setScaleSettings({
                  ...scaleSettings,
                  point2: { x: newPosX, y: newPosY },
                });
              } catch (error) {
                console.log(error);
              }
            }
          }

          if (apMoveSettings.isMoving && mode.moveAp) {
            const key = arrayAps.findIndex((obj) => {
              return obj.apName === apMoveSettings.movingAp;
            });

            {
              if (apMoveSettings.isMoving) {
                let { left, top } = refMap.current.getBoundingClientRect();
                let newPosX = e.clientX - left - 10;
                let newPosY = e.clientY - top - 10;

                try {
                  arrayAps[key].posX = newPosX;
                  arrayAps[key].posY = newPosY;
                  setArrayAps([...arrayAps]);
                } catch (error) {
                  console.log(error);
                }
                try {
                  arrayAps[key].initialX =
                    (newPosX * MAP_WIDTH) / apMoveSettings.currentMapX;
                  arrayAps[key].initialY =
                    (newPosY * MAP_HEIGHT) / apMoveSettings.currentMapY;
                  setArrayAps([...arrayAps]);
                } catch (error) {
                  console.log(error);
                }
              }
            }
          }
          {
            if (mapMoveSettings.isMoving && mode.moveMap) {
              setMapMoveSettings({
                ...mapMoveSettings,
                isMoving: true,
                posX:
                  mapMoveSettings.initialPosX +
                  e.clientX -
                  mapMoveSettings.initialMouseX,
                posY:
                  mapMoveSettings.initialPosY +
                  e.clientY -
                  mapMoveSettings.initialMouseY,
              });
            }
          }
        }}
        MapPosX={mapMoveSettings.posX + "px"}
        MapPosY={mapMoveSettings.posY + "px"}
        MapWidth={mapMoveSettings.mapWidth + "px"}
        MapWidth={mapMoveSettings.mapHeigth + "px"}
      >
        <svg
          height="100%"
          width="100%"
          style={{
            overflow: "hidden",
            position: "absolute",
            top: "0px",
            left: "0px",
            display: "flex",
          }}
        >
          <line
            x1={scaleSettings.point1.x}
            y1={scaleSettings.point1.y}
            x2={scaleSettings.point2.x}
            y2={scaleSettings.point2.y}
            style={{ stroke: "red", strokeWidth: 2 }}
          />
          <text
            style={{ userSelect: "none", fontSize: "24px" }}
            x={arrayAps[0].posX + (arrayAps[1].posX - arrayAps[0].posX) / 2}
            y={
              arrayAps[0].posY + (arrayAps[1].posY - arrayAps[0].posY) / 2 - 20
            }
          >
            {pixelToMeter(
              apMoveSettings.currentMapX,
              scaleSettings.mapWidthMeter,
              getDistance(
                arrayAps[1].posX,
                arrayAps[0].posX,
                arrayAps[1].posY,
                arrayAps[0].posY
              )
            ).toFixed(1)}
          </text>
        </svg>
        {arrayAps.map((entry) => {
          return (
            <AccessPoint
              dragAction={apDragAction}
              apName={entry.apName}
              posX={entry.posX}
              posY={entry.posY}
              apSize={entry.apSize}
              label={entry.label}
              key={entry.apName}
              initialMapSizeY={MAP_HEIGHT}
              initialMapSizeX={MAP_WIDTH}
            />
          );
        })}
        <div>
          <img src={img} draggable="false" />
        </div>
      </MapContainer>
    </Container>
  );
}

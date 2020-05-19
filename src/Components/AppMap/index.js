import React, { useState } from "react";
import img from "./img/base.png";
import AccessPoint from "../AccessPoint";
import { Container, MapContainer } from "./styles";
import { ApContext } from "./ApContext";

import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";

export default function AppMap() {
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;

  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: true,
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

  const [zoomLevel, setZoomLevel] = useState({
    level: 1,
  });

  const [apMoveSettings, setApMoveSettings] = useState({
    movingMode: false,
    currentMapX: MAP_WIDTH,
    currentMapY: MAP_HEIGHT,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMousey: 0,
    posX: 0,
    posY: 0,
  });

  const [arrayAps, setArrayAps] = useState([
    {
      apName: "AP001",
      posX: 30,
      posY: 30,
      apSize: 30,
      label: true,
      initialX: 30,
      initialY: 30,
    },
    {
      apName: "AP002",
      posX: 100,
      posY: 110,
      apSize: 30,
      label: true,
      initialX: 100,
      initialY: 110,
    },
    {
      apName: "AP003",
      posX: 320,
      posY: 25,
      apSize: 30,
      label: true,
      initialX: 320,
      initialY: 25,
    },
  ]);

  const [controlsParameters, setControlParameters] = useState({
    zoomIn: false,
    zoomOut: false,
    addAp: false,
    measureDistance: false,
  });

  const handleMenuAction = (type) => {
    const ZoomInFactor = 1.1;
    const ZoomOutFactor = 1 / ZoomInFactor;

    switch (type) {
      case "ZoomIn":
        if (zoomLevel.level <= 10) {
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
      default:
    }
  };

  return (
    <ApContext.Provider
      value={{ apMoveSettings, setApMoveSettings, arrayAps, setArrayAps }}
    >
      <Container>
        <TopMenu menuAction={handleMenuAction} />
        <SideMenu menuAction={handleMenuAction} />

        <MapContainer
          onMouseDown={(e) => {
            console.log(mapMoveSettings);
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
          }}
          onMouseUp={(e) => {
            e.stopPropagation();
            if (mapMoveSettings.isMoving === true) {
              setMapMoveSettings({
                ...mapMoveSettings,
                isMoving: false,
              });
            }
          }}
          onMouseMove={(e) => {
            {
              if (mapMoveSettings.isMoving) {
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
          {arrayAps.map((entry) => {
            return (
              <AccessPoint
                apName={entry.apName}
                posX={entry.posX}
                posY={entry.posY}
                apSize={entry.apSize}
                label={entry.label}
                key={entry.apName}
                initialMapSizeY={MAP_HEIGHT}
                initialMapSizeX={MAP_WIDTH}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
              />
            );
          })}
          <div>
            <img src={img} draggable="false" />
          </div>
        </MapContainer>
      </Container>
    </ApContext.Provider>
  );
}

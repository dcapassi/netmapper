import React, { useState } from "react";
import img from "./img/base.png";
import AccessPoint from "../AccessPoint";
import { Container, MapContainer } from "./styles";
import { ApContext } from "./ApContext";

import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";

export default function AppMap() {
  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: true,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMousey: 0,
    posX: 0,
    posY: 0,
    mapHeigth: 860,
    mapWidth: 1700,
  });

  const [zoomLevel, setZoomLevel] = useState({
    level: 1,
  });

  const [apMoveSettings, setApMoveSettings] = useState({
    movingMode: true,
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
    },
    {
      apName: "AP002",
      posX: 100,
      posY: 110,
      apSize: 30,
      label: true,
    },
    {
      apName: "AP003",
      posX: 320,
      posY: 25,
      apSize: 30,
      label: true,
    },
  ]);

  const [controlsParameters, setControlParameters] = useState({
    zoomIn: false,
    zoomOut: false,
    addAp: false,
    measureDistance: false,
  });

  const handleMenuAction = (type) => {
    switch (type) {
      case "ZoomIn":
        if (zoomLevel.level <= 25) {
          setZoomLevel({ ...zoomLevel, level: zoomLevel.level + 1 });
          setMapMoveSettings({
            ...mapMoveSettings,
            mapHeigth: mapMoveSettings.mapHeigth * 1.1,
            mapWidth: mapMoveSettings.mapWidth * 1.1,
          });
        }
        setArrayAps(
          arrayAps.map((entry) => {
            return { ...entry, posX: entry.posX * 1.1, posY: entry.posY * 1.1 };
          })
        );

        break;
      case "ZoomOut":
        if (zoomLevel.level > 1) {
          setZoomLevel({ ...zoomLevel, level: zoomLevel.level - 1 });
          setMapMoveSettings({
            ...setMapMoveSettings,
            mapHeigth: mapMoveSettings.mapHeigth * 0.9,
            mapWidth: mapMoveSettings.mapWidth * 0.9,
          });
          setArrayAps(
            arrayAps.map((entry) => {
              return {
                ...entry,
                posX: entry.posX * 0.9,
                posY: entry.posY * 0.9,
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

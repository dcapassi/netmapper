import React, { useState } from "react";
import img from "./img/blueprint.png";
import AccessPoint from "../AccessPoint";
import { Container, MapContainer } from "./styles";
import { ApContext } from "./ApContext";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";

export default function AppMap() {
  const [ap, setAp] = useState({
    apName: "AP001",
    posX: 30,
    posY: 30,
    apSize: 30,
    label: true,
  });

  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: true,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMousey: 0,
    posX: 0,
    posY: 0,
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

  const [arrayAps, setArrayAps] = useState([]);

  const arrayTestAps = [
    {
      apName: "AP001",
      posX: "30",
      posY: "30",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP002",
      posX: "100",
      posY: "110",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP003",
      posX: "320",
      posY: "25",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP002",
      posX: "130",
      posY: "110",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP003",
      posX: "350",
      posY: "25",
      apSize: "30",
      label: true,
    },
  ];

  return (
    <ApContext.Provider value={{ apMoveSettings, setApMoveSettings }}>
      <Container>
        <TopMenu />
        <SideMenu />

        <MapContainer
          onMouseDown={(e) => {
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
        >
          {/*arrayTestAps.map((entry) => {
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
          })*/}
          <div>
            <img src={img} draggable="false" />
            <div>
              {console.log("Valor" + apMoveSettings.posX)}
              <AccessPoint
                apName={ap.apName}
                posX={apMoveSettings.posX}
                posY={apMoveSettings.posY}
                apSize={ap.apSize}
                label={ap.label}
              />
            </div>
          </div>
        </MapContainer>
      </Container>
    </ApContext.Provider>
  );
}

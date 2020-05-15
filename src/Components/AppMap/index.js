import React, { useState, useRef } from "react";
import img from "./img/blueprint.png";
import AccessPoint from "../AccessPoint";
import { Container, MapContainer } from "./styles";
import { useDrop, useDrag } from "react-dnd";

export default function AppMap() {
  const [ap, setAp] = useState({
    apName: "AP001",
    posX: 30,
    posY: 30,
    apSize: 30,
    label: true,
  });

  const [map, setMap] = useState({
    posX: 50,
    posY: 50,
  });

  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: true,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMousey: 0,
    posX: 50,
    posY: 50,
  });

  const ref = useRef();

  const [{ isDragging, clientOffset }, dragMapRef] = useDrag({
    item: { type: "Map" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
    }),
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "AP",
    drop: (item, monitor) => {
      const { x: difX, y: difY } = monitor.getDifferenceFromInitialOffset();
      const newPosX = ap.posX + difX;
      const newPosY = ap.posY + difY;
      setAp({ ...ap, posX: newPosX, posY: newPosY });
    },
  });

  const [, dropMapRef] = useDrop({
    accept: "Map",
    hover: (item, monitor) => {
      const { x: difX, y: difY } = monitor.getDifferenceFromInitialOffset();
      const { x: intialX, y: intialY } = monitor.getInitialSourceClientOffset();
      const newPosX = map.posX + difX;
      const newPosY = map.posY + difY;
      setMap({ ...map, posX: intialX + difX, posY: intialY + difY });
    },
  });

  dragMapRef(dropRef(ref));

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
      posX: "300",
      posY: "25",
      apSize: "30",
      label: true,
    },
  ];

  return (
    <Container>
      <MapContainer
        ref={dropRef}
        onMouseDown={(e) => {
          console.log("Click no Container")
          if (mapMoveSettings != true) {
            {
              setMapMoveSettings({
                ...mapMoveSettings,
                isMoving: true,
                initialMouseX: e.clientX,
                initialMouseY: e.clientY,
                initialPosX: mapMoveSettings.posX,
                initialPosY: mapMoveSettings.posY,
              });
              console.log(e.clientOffset);
            }
          }
        }}
        onMouseUp={(e) => {
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
        {arrayTestAps.map((entry) => {
          return (
            <AccessPoint
              apName={entry.apName}
              posX={entry.posX}
              posY={entry.posY}
              apSize={entry.apSize}
              label={entry.label}
              key={entry.apName}
            />
          );
        })}
        <AccessPoint
          apName={ap.apName}
          posX={50}
          posY={50}
          apSize={ap.apSize}
          label={ap.label}
          key={ap.apName}
        />

        <img src={img} draggable="false" />
      </MapContainer>
    </Container>
  );
}

import React, { useContext } from "react";

import { Container } from "./styles";
import { AiOutlineWifi } from "react-icons/ai";
import { ApContext } from "../AppMap/ApContext";

function AccessPoint(props) {
  const { apMoveSettings, setApMoveSettings } = useContext(ApContext);
  return (
    <Container
      posX={props.posX}
      posY={props.posY}
      apSize={props.apSize}
      onMouseDown={(e) => {
        e.stopPropagation();
        if (apMoveSettings !== true) {
          {
            setApMoveSettings({
              ...apMoveSettings,
              isMoving: true,
              initialMouseX: e.clientX,
              initialMouseY: e.clientY,
              initialPosX: apMoveSettings.posX,
              initialPosY: apMoveSettings.posY,
            });
          }
        }
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        if (apMoveSettings.isMoving === true) {
          setApMoveSettings({
            ...apMoveSettings,
            isMoving: false,
          });
        }
      }}
      onMouseMove={(e) => {
        e.stopPropagation();

        {
          if (apMoveSettings.isMoving) {
            setApMoveSettings({
              ...apMoveSettings,
              isMoving: true,
              posX:
                apMoveSettings.initialPosX +
                e.clientX -
                apMoveSettings.initialMouseX,
              posY:
                apMoveSettings.initialPosY +
                e.clientY -
                apMoveSettings.initialMouseY,
            });
          }
        }
      }}
    >

      <div className="apMarker">
        <AiOutlineWifi />
        
      </div>
      {props.label ? (
        <div>
          <p>{props.apName}</p>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
}

export default AccessPoint;

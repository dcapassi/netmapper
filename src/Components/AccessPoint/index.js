import React, { useContext } from "react";

import { Container } from "./styles";
import { AiOutlineWifi } from "react-icons/ai";
import { ApContext } from "../AppMap/ApContext";

function AccessPoint(props) {
  const {
    apMoveSettings,
    setApMoveSettings,
    arrayAps,
    setArrayAps,
  } = useContext(ApContext);
  return (
    <Container
      posX={props.posX}
      posY={props.posY}
      isDraggin={props.isDraggin}
      apSize={props.apSize}
      onMouseDown={(e) => {
        e.stopPropagation();

        const key = arrayAps.findIndex((obj) => {
          return obj.apName === props.apName;
        });

        console.log(arrayAps);

        if (apMoveSettings.isMoving !== true) {
          {
            setApMoveSettings({
              ...apMoveSettings,
              isMoving: true,
              initialMouseX: e.clientX,
              initialMouseY: e.clientY,
              initialPosX: arrayAps[key].posX,
              initialPosY: arrayAps[key].posY,
            });
          }
        }
      }}
      onMouseUp={(e) => {
        e.stopPropagation();

        const key = arrayAps.findIndex((obj) => {
          return obj.apName === props.apName;
        });

        if (apMoveSettings.isMoving === true) {
          setApMoveSettings({
            ...apMoveSettings,
            isMoving: false,
          });
        }
      }}
      onMouseMove={(e) => {
        e.stopPropagation();

        const key = arrayAps.findIndex((obj) => {
          return obj.apName === props.apName;
        });

        {
          if (apMoveSettings.isMoving) {
            let newPosX =
              apMoveSettings.initialPosX +
              e.clientX -
              apMoveSettings.initialMouseX;
            let newPosY =
              apMoveSettings.initialPosY +
              e.clientY -
              apMoveSettings.initialMouseY;
            try {
              arrayAps[key].posX = newPosX;
              arrayAps[key].posY = newPosY;
              setArrayAps([...arrayAps]);
            } catch (error) {
              console.log(error);
            }
            try {
              arrayAps[key].initialX =
                (newPosX * props.initialMapSizeX) / apMoveSettings.currentMapX;
              arrayAps[key].initialY =
                (newPosY * props.initialMapSizeY) / apMoveSettings.currentMapY;
              setArrayAps([...arrayAps]);
            } catch (error) {
              console.log(error);
            }
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

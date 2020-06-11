import React from "react";
import { Container } from "./styles";
import { AiOutlineWifi } from "react-icons/ai";

function AccessPoint(props) {
  return (
    <>
      <Container
        posX={props.posX}
        posY={props.posY}
        isMoving={props.isMoving}
        apSize={props.apSize}
        onMouseDown={(e) => {
          e.stopPropagation();
          props.dragAction(e, props.apName, props.id);
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
    </>
  );
}

export default AccessPoint;

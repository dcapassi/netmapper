import React from "react";
import { Container } from "./styles";
import { BsArrowLeftRight } from "react-icons/bs";
function Switch(props) {
  return (
    <>
      <Container
        posX={props.posX}
        posY={props.posY}
        isMoving={props.isMoving}
        switchSize={props.switchSize}
        onMouseDown={(e) => props.dragAction(e, props.switchName)}
      >
        <div className="switchMarker">
          <BsArrowLeftRight />
        </div>
        {props.label ? (
          <div>
            <p>{props.switchName}</p>
          </div>
        ) : (
          <></>
        )}
      </Container>
    </>
  );
}

export default Switch;

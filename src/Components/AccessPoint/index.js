import React from "react";
import { useDrag } from "react-dnd";

import { Container } from "./styles";
import { AiOutlineWifi } from "react-icons/ai";

function AccessPoint(props) {
  const [{ isDragging, clientOffset }, dragRef] = useDrag({
    item: { type: "AP" },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
      clientOffset: monitor.getClientOffset(),
    }),
  });
  return (
      <Container
        posX={props.posX}
        posY={props.posY}
        apSize={props.apSize}
        isDragging={isDragging}
        ref={dragRef}
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

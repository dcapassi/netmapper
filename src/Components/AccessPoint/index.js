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
      isDragging={isDragging}
      ref={dragRef}
      posX={props.posX}
      posY={props.posY}
      apSize={props.apSize}
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

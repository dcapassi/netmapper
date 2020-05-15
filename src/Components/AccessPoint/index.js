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
        setApMoveSettings({
          ...apMoveSettings,
          posX: apMoveSettings.posX + 1,
          posY: apMoveSettings.posY + 1,
        });
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

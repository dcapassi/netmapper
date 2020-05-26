import React from "react";
import {
  FaRulerHorizontal,
  FaMousePointer,
  FaArrowsAlt,
  FaWifi,
} from "react-icons/fa";
import { Container } from "./styles";

function TopMenu(props) {
  return (

    <Container visible={props.visible} mode={props.mode}>
      <div>
        <div className="moveMap" onClick={() => props.menuAction("Mouse")}>
          <FaMousePointer />
        </div>
        <div className="moveAp"onClick={() => props.menuAction("Move")}>
          <FaArrowsAlt />
        </div>
        <div className="addAp" onClick={() => props.menuAction("addAp")}>
          <FaWifi />
        </div>
        <div className="measureDistance"onClick={() => props.menuAction("Ruler")}>
          <FaRulerHorizontal />
        </div>
      </div>
    </Container>
  );
}

export default TopMenu;

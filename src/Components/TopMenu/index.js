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
    <Container visible={props.visible}>
      <div>
        <div onClick={() => props.menuAction("Mouse")}>
          <FaMousePointer />
        </div>
        <div onClick={() => props.menuAction("Move")}>
          <FaArrowsAlt />
        </div>
        <div onClick={() => props.menuAction("addAp")}>
          <FaWifi />
        </div>
        <div onClick={() => props.menuAction("Ruler")}>
          <FaRulerHorizontal />
        </div>
      </div>
    </Container>
  );
}

export default TopMenu;

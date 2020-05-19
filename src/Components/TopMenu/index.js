import React from "react";
import { FaRulerHorizontal, FaMousePointer, FaWifi } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { Container } from "./styles";

function TopMenu({ menuAction }) {
  return (
    <Container>
      <div>
        <div onClick={() => menuAction("Mouse")}>
          <FaMousePointer />
        </div>
        <div onClick={() => menuAction("addApp")}>
          <FaWifi />
        </div>
        <div onClick={() => menuAction("Ruler")}>
          <FaRulerHorizontal />
        </div>
      </div>
    </Container>
  );
}

export default TopMenu;

import React from "react";
import { FaRulerHorizontal, FaMousePointer, FaWifi } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { Container } from "./styles";

function SideMenu() {
  return (
    <Container>
      <div>
        <div>
          <FaMousePointer />
        </div>
        <div>
          <FaWifi />
        </div>
        <div>
          <FaRulerHorizontal />
        </div>
      </div>
    </Container>
  );
}

export default SideMenu;

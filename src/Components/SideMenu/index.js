import React from "react";
import { FaSearchPlus, FaSearchMinus, FaCompressAlt } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { Container } from "./styles";

function SideMenu(props) {
  return (
    <Container visible={props.visible}>
      <div>
        <div onClick={() => props.menuAction("Fit")}>
          <FaCompressAlt />
        </div>
        <div onClick={() => props.menuAction("ZoomIn")}>
          <FaSearchPlus />
        </div>
        <div onClick={() => props.menuAction("ZoomOut")}>
          <FaSearchMinus />
        </div>
      </div>
    </Container>
  );
}

export default SideMenu;

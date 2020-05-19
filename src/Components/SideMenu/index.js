import React from "react";
import { FaSearchPlus, FaSearchMinus, FaCompressAlt } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { Container } from "./styles";

function SideMenu({ menuAction }) {
  return (
    <Container>
      <div>
        <div onClick={() => menuAction("Fit")}>
          <FaCompressAlt />
        </div>
        <div onClick={() => menuAction("ZoomIn")}>
          <FaSearchPlus />
        </div>
        <div onClick={() => menuAction("ZoomOut")}>
          <FaSearchMinus />
        </div>
      </div>
    </Container>
  );
}

export default SideMenu;

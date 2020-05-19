import React from "react";
import { FaSearchPlus, FaSearchMinus, FaCompressAlt } from "react-icons/fa";
import { AiOutlineWifi } from "react-icons/ai";
import { Container } from "./styles";

function SideMenu() {
  return (
    <Container>
      <div>
        <div>
          <FaCompressAlt />
        </div>
        <div>
          <FaSearchPlus />
        </div>
        <div>
          <FaSearchMinus />
        </div>
      </div>
    </Container>
  );
}

export default SideMenu;

import React, { useState } from "react";
import List from "../List/List";
import { BsArrowLeft } from "react-icons/bs";

import { Container, ActionButton } from "./styles";

function SidePanel(props) {
  return (
    <Container>
      <List callBack={props.callBack} />
    </Container>
  );
}

export default SidePanel;

import React from "react";
import List from "../List/List";

import { Container } from "./styles";

function SidePanel(props) {
  return (
    <Container>
      <List callBack={props.callBack} />
    </Container>
  );
}

export default SidePanel;

import React from "react";
import AppMap from "../../Components/AppMap";
import Header from "../../Components/Header";
import SidePanel from "../../Components/SidePanel";
import AccessPoint from "../../Components/AccessPoint";

import { Container } from "./styles";

function DesignMap() {
  return (
    <>
        <Container>
          <SidePanel />
          <AppMap />
        </Container>
    </>
  );
}

export default DesignMap;

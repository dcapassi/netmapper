import React from "react";
import AppMap from "../../Components/AppMap";
import Header from "../../Components/Header";
import SidePanel from "../../Components/SidePanel";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import AccessPoint from "../../Components/AccessPoint";

import { Container } from "./styles";

function DesignMap() {



  return (
    <DndProvider backend={HTML5Backend}>
      <Header />
      <Container>
        <SidePanel />
        <AppMap />
      </Container>
    </DndProvider>
  );
}

export default DesignMap;

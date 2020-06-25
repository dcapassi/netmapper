import React, { useState } from "react";
import AppMap from "../../Components/AppMap";
import Header from "../../Components/Header";
import SidePanel from "../../Components/SidePanel";
import AccessPoint from "../../Components/AccessPoint";

import { Container } from "./styles";

function DesignMap() {
  const [mapVisible, setMapVisible] = useState(false);

  const getOptionCallBack = (message) => {
    if (message.type === "floor") {
      setMapVisible(true);
    } else {
      setMapVisible(false);
    }
  };
  return (
    <>
      <Header />
      <Container>
        <SidePanel callBack={getOptionCallBack} />
        {mapVisible && <AppMap />}
      </Container>
    </>
  );
}

export default DesignMap;

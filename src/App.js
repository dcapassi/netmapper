import React from "react";
import DesignMap from "./Pages/DesignMap";
import GlobalStyle from "./Styles/global";
import Header from "./Components/Header";
import Box from "@material-ui/core/Box";

function App() {
  return (
    <>
      <GlobalStyle />
      <DesignMap />
    </>
  );
}

export default App;

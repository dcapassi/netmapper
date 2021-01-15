import React from "react";
import { Switch } from "react-router-dom";
import Route from "../routes/Route";

import Login from "../Pages/Login";
import MenuPrincipal from "../Pages/DesignMap";
//import CadastrarUsuario from "../../src/Pages/Usuarios/CadastrarUsuario";

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/MenuPrincipal" component={MenuPrincipal} isPrivate={true} />
      {/*
      <Route
        path="/CadastrarUsuario"
        component={CadastrarUsuario}
        isPrivate={true}
        
      />*/}
    </Switch>
  );
}

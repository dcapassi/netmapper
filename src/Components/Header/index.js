import React, { useState } from "react";
import { Container } from "./styles";
import avatar from "../../static/imgs/dcapassi.jpg";

export default function Header() {
  return (
    <Container>
      <div className="Wrapper">
        <div className="LeftIcon">
          <p>NetMapper</p>
        </div>
        <div className="CenterOptions"></div>
        <div className="RightUserConfigs">
          <div>
            <p>
              <strong>Diego Capassi Moreira</strong>
            </p>
            <p>diego@yahoo.com.br</p>
          </div>
          <div className="Avatar">
            <img src={avatar} alt="User" />
          </div>
        </div>
      </div>
    </Container>
  );
}

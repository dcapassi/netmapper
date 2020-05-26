import React from "react";
import { Container } from "./ResetScaleStyles";

function Scale(props) {
  return (
    <Container
      visible={props.visible}
      onClick={(e) => {
        e.stopPropagation();
        props.messageCallBack({ scale: { reset: true } });
      }}
    >
      <button type="button">Reset scale</button>
    </Container>
  );
}

export default Scale;

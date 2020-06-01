import React, { useState } from "react";

import { Container, Header, Body } from "./styles";
import { AiOutlineClose } from "react-icons/ai";

function DeviceEditBox(props) {
  const [inputName, setInputName] = useState(props.editElement.elementName);
  const [ch24Ghz, setCh24Ghz] = useState([1, 6, 11]);
  const [ch5Ghz, setCh5Ghz] = useState([
    34,
    36,
    38,
    40,
    42,
    44,
    46,
    48,
    52,
    56,
    60,
    64,
    100,
    104,
    108,
    112,
    116,
    120,
    124,
    128,
    132,
    136,
    140,
  ]);
  return (
    <Container
      editElement={props.editElement}
      setEditField={props.setEditField}
    >
      <Header>
        <div>
          <p>Edit - {props.editElement.elementName}</p>
          <div>
            <AiOutlineClose
              onClick={() => {
                props.closeBox();
              }}
            />
          </div>
        </div>
      </Header>
      <Body>
        <div>
          <p>Name</p>
          <input
            value={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <p>Model</p>
          <input type="text" />
        </div>
        <div>
          <p>Customer</p>
          <input type="text" />
        </div>
        <div>
          <p>Channel 2.4 GHz</p>
          <select name="ch24">
            {ch24Ghz.map((entry) => {
              return (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>Channel 5 GHz</p>
          <select name="ch5">
            {ch5Ghz.map((entry) => {
              return (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              );
            })}
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            onClick={(e) => {
              props.setEditField({
                targetElement: props.editElement.elementName,
                apName: inputName,
              });
              props.closeBox();
              e.stopPropagation();
            }}
          >
            Confirm
          </button>
        </div>
      </Body>
    </Container>
  );
}

export default DeviceEditBox;

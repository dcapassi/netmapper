import React, { useState } from "react";

import { Container, Header, Body } from "./styles";
import { AiOutlineClose } from "react-icons/ai";

import { deviceList } from "../../Data/DeviceList";

function DeviceEditBox(props) {
  const [inputName, setInputName] = useState(props.editElement.elementName);

  const [customer, setCustomer] = useState();
  const [model, setModel] = useState();

  //Push a "" item as the first item
  let deviceArray = [];
  deviceArray.push("");
  deviceList.map((entry) => deviceArray.push(entry.model));

  console.log(deviceArray);
  const [modelList, setModelList] = useState(deviceArray);
  const [ch24GhzList, setCh24Ghz] = useState(["", 1, 6, 11]);
  const [ch5GhzList, setCh5GhzList] = useState([
    "",
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
  const [channel24G, setChannel24G] = useState(ch24GhzList[0]);
  const [channel5G, setChannel5G] = useState(ch5GhzList[0]);
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
            defaultValue={inputName}
            onChange={(e) => {
              setInputName(e.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <p>Model</p>
          <select
            defaultValue={model}
            onChange={(e) => {
              setModel(e.target.value);
            }}
            type="text"
          >
            {deviceArray.map((entry) => {
              return (
                <option key={entry} value={entry}>
                  {entry}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <p>Customer</p>
          <input
            defaultValue={customer}
            onChange={(e) => {
              setCustomer(e.target.value);
            }}
            type="text"
          />
        </div>
        <div>
          <p>Channel 2.4 GHz</p>
          <select
            defaultValue={channel24G}
            onChange={(e) => {
              setChannel24G(e.target.value);
            }}
            name="ch24"
          >
            {ch24GhzList.map((entry) => {
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
          <select
            defaultValue={channel5G}
            onChange={(e) => {
              setChannel5G(e.target.value);
            }}
            name="ch5"
          >
            {ch5GhzList.map((entry) => {
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
                model,
                customer,
                channel24G,
                channel5G,
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

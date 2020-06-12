import React, { useState, useEffect } from "react";

import { Container, Header, Body } from "./styles";
import { AiOutlineClose } from "react-icons/ai";

import { deviceList } from "../../Data/DeviceList";

function DeviceEditBox(props) {
  const [inputName, setInputName] = useState(props.editElement.elementName);
  const [customer, setCustomer] = useState();
  const [model, setModel] = useState();
  const [accessSwitch, setAccessSwitch] = useState();
  const [selectedChannel, setSelectedChannel] = useState();
  const [selectedChannel5Ghz, setSelectedChannel5Ghz] = useState();

  const [selectedModel, setSelectedModel] = useState();
  const [selectedSwitch, setSelectedSwitch] = useState();

  //Push a "" item as the first item
  let deviceArray = [];
  deviceArray.push("");
  deviceList.map((entry) => deviceArray.push(entry.model));

  const [modelList, setModelList] = useState(deviceArray);
  const [ch24GhzList, setCh24Ghz] = useState(["", "1", "6", "11"]);
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
  const [channel24G, setChannel24G] = useState();
  const [channel5G, setChannel5G] = useState();

  useEffect(() => {
    props.editType === "ap" &&
      props.apList.map((entry) => {
        if (entry.key === props.editElement.elementKey) {
          setChannel24G(entry.channel);
          setChannel5G(entry.channel5Ghz);
          setModel(entry.model);
          setCustomer(entry.customer);
          setSelectedModel(entry.model);
          setAccessSwitch(entry.accessSwitch);
        }
      });
  }, []);

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
      {props.editType === "ap" && (
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
              value={model}
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
              value={channel24G}
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
              value={channel5G}
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
          <div>
            <p>Access Switch</p>
            <select
              defaultValue={accessSwitch}
              value={accessSwitch}
              onChange={(e) => {
                setAccessSwitch(e.target.value);
              }}
              name="Access Switch"
            >
              <option></option>
              {props.switchList.map((entry) => {
                return (
                  <option key={entry.switchName} value={entry.switchName}>
                    {entry.switchName}
                  </option>
                );
              })}
            </select>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <button
              onClick={(e) => {
                props.setEditField({
                  targetElement: props.editElement.elementKey,
                  apName: inputName,
                  model,
                  accessSwitch,
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
      )}
    </Container>
  );
}

export default DeviceEditBox;

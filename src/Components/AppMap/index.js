import React, { useState, useRef, useEffect } from "react";
import img from "./img/blueprint.png";
import AccessPointContainer from "../AccessPoint";
import SwitchContainer from "../Switch";
import ScaleContainer from "../Scale";
import ResetScale from "../Scale/ResetScale";
import { Container, MapContainer } from "./styles";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import DeviceEditBox from "../DeviceEditBox/DeviceEditBox";

import { getDistance, pixelToMeter } from "../../Utils";

export default function AppMap() {
  //Reference passed to children to get the current map position.
  const refMap = useRef(null);

  //ApSize
  const [apSize, setApSize] = useState(15);

  //Element being edited
  const [editingElement, setEditingElement] = useState("");
  const [editingKey, setEditingKey] = useState("");

  const [editType, setEditType] = useState();

  //Pass to the AccessPoint Controller that there was a change
  const [apConfigModified, setApConfigModified] = useState({});

  const getEditFields = (obj) => {
    switch (editType) {
      case "ap":
        {
          setApConfigModified({ ...obj });
        }
        break;
      default:
        break;
    }
  };
  //Map size, may be adjusted based on the img size.
  const MAP_HEIGHT = 860 * 1.3;
  const MAP_WIDTH = 1700 * 1.3;

  const [apUpdatedList, setApUpdatedList] = useState([]);
  const [switchUpdatedList, setSwitchUpdatedList] = useState([]);

  const closeBox = () => {
    setMode({
      ...mode,
      zoomIn: false,
      zoomOut: false,
      addAp: false,
      addSwitch: false,
      measureDistance: false,
      clickMode: true,
      moveAp: false,
      editing: false,
    });

    setMenuVisible({
      ...menuVisible,
      visible: true,
    });
  };

  const getApUpdatedList = (apList) => {
    setApUpdatedList(apList);
  };

  const getSwitchesUpdatedList = (switchList) => {
    setSwitchUpdatedList(switchList);
  };

  const containerMessage = (msg) => {
    if (msg.edit) {
      if (msg.edit.isEditing === true) {
        setMode({
          ...mode,
          editing: true,
          zoomIn: false,
          zoomOut: false,
          addAp: false,
          addSwitch: false,
          measureDistance: false,
          clickMode: false,
        });
        setMenuVisible({
          ...menuVisible,
          visible: false,
        });
        setEditingElement(msg.edit.elementName);
        setEditingKey(msg.edit.elementKey);
        setEditType(msg.edit.type);
      } else if (msg.edit.isEditing === false) {
        setMode({
          ...mode,
          editing: false,
        });
        setMenuVisible({
          ...menuVisible,
          visible: true,
        });
        setEditingElement(null);
        setEditType(null);
      }
    }
    if (msg.ap) {
      if (msg.ap.isMoving === true) {
        setMenuVisible({
          ...menuVisible,
          visible: false,
        });
      } else if (msg.ap.isMoving === false) {
        setMenuVisible({
          ...menuVisible,
          visible: true,
        });
      }
    }
    if (msg.scale) {
      if (msg.scale.isMeasuring === true) {
        setMenuVisible({
          ...menuVisible,
          visible: false,
        });
      } else if (msg.scale.isMeasuring === false) {
        setMenuVisible({
          ...menuVisible,
          visible: true,
        });
      }
      if (msg.scale.reset === true) {
        setResetScaleSignal({
          ...resetScaleSignal,
          reset: true,
        });
      }
      localStorage.removeItem("scaleConfigs");
    }
  };

  const [menuVisible, setMenuVisible] = useState({
    visible: true,
  });

  const [resetScaleSignal, setResetScaleSignal] = useState({
    reset: false,
  });

  const [mapMoveSettings, setMapMoveSettings] = useState({
    movingMode: false,
    isMoving: false,
    initialPosX: 0,
    initialPosY: 0,
    initialMouseX: 0,
    initialMouseY: 0,
    posX: 0,
    posY: 0,
    mapHeigth: MAP_HEIGHT,
    mapWidth: MAP_WIDTH,
  });

  const [zoomLevel, setZoomLevel] = useState({
    level: 1,
    type: false,
    zoomInFactor: 1.1,
    zoomOutFactor: 1 / 1.1,
  });

  const [mouseMoveEvent, setMouseMoveEvent] = useState({
    x: null,
    y: null,
  });
  const [mapClickEvent, setMapClickEvent] = useState({
    x: null,
    y: null,
  });

  const [mode, setMode] = useState({
    zoomIn: false,
    zoomOut: false,
    addAp: false,
    addSwitch: false,
    measureDistance: false,
    clickMode: false,
    moveAp: false,
    editing: false,
  });

  // Map Functions
  const mapOnMouseDown = (e) => {
    if (mode.editing) {
      return false;
    }
    if (mode.measureDistance) {
    }
    if (mode.addAp) {
      return false;
    }
    if (mode.addSwitch) {
      return false;
    }
    if (mode.clickMode) {
      e.preventDefault();
      if (mapMoveSettings !== true) {
        {
          setMapMoveSettings({
            ...mapMoveSettings,
            isMoving: true,
            initialMouseX: e.clientX,
            initialMouseY: e.clientY,
            initialPosX: mapMoveSettings.posX,
            initialPosY: mapMoveSettings.posY,
          });
          setMenuVisible({
            ...menuVisible,
            visible: false,
          });
        }
      }
    }
  };
  const mapOnMouseUp = (e) => {
    e.stopPropagation();
    if (mode.addAp) {
      return false;
    }
    if (mode.addSwitch) {
      return false;
    }
    if (mapMoveSettings.isMoving === true) {
      setMapMoveSettings({
        ...mapMoveSettings,
        isMoving: false,
      });
      setMenuVisible({
        ...menuVisible,
        visible: true,
      });
    }
  };
  const mapOnClick = (e) => {
    e.preventDefault();

    ///Set the values to the MouseMoveEvent to be used by the children elements
    setMapClickEvent({ ...mapClickEvent, x: e.clientX, y: e.clientY });

    let { left, top } = refMap.current.getBoundingClientRect();
    let newPosX = e.clientX - left;
    let newPosY = e.clientY - top;
  };
  const mapOnMouseMove = (e) => {
    ///Set the values to the MouseMoveEvent to be used by the children elements
    setMouseMoveEvent({ ...mouseMoveEvent, x: e.clientX, y: e.clientY });

    {
      if (mapMoveSettings.isMoving && mode.clickMode) {
        setMapMoveSettings({
          ...mapMoveSettings,
          isMoving: true,
          posX:
            mapMoveSettings.initialPosX +
            e.clientX -
            mapMoveSettings.initialMouseX,
          posY:
            mapMoveSettings.initialPosY +
            e.clientY -
            mapMoveSettings.initialMouseY,
        });
      }
    }
  };

  //Component responsible for updating the state
  const handleMenuAction = (type) => {
    const ZoomInFactor = 1.1;
    const ZoomOutFactor = 1 / ZoomInFactor;

    switch (type) {
      case "ZoomIn":
        if (zoomLevel.level <= 25) {
          setZoomLevel({
            ...zoomLevel,
            level: zoomLevel.level + 1,
            type: "ZoomIn",
          });

          setMode({
            ...mode,
            addAp: false,
            addSwitch: false,
            moveAp: false,
            clickMode: false,
            measureDistance: false,
          });

          let mapHeightUpdated = mapMoveSettings.mapHeigth * ZoomInFactor;
          let mapWidthUpdated = mapMoveSettings.mapWidth * ZoomInFactor;

          setMapMoveSettings({
            ...mapMoveSettings,
            mapHeigth: mapHeightUpdated,
            mapWidth: mapWidthUpdated,
          });
        }
        break;
      case "ZoomOut":
        if (zoomLevel.level > 1) {
          let mapHeightUpdated = mapMoveSettings.mapHeigth * ZoomOutFactor;
          let mapWidthUpdated = mapMoveSettings.mapWidth * ZoomOutFactor;
          setZoomLevel({
            ...zoomLevel,
            level: zoomLevel.level - 1,
            type: "ZoomOut",
          });
          setMode({
            ...mode,
            addAp: false,
            addSwitch: false,
            moveAp: false,
            clickMode: false,
            measureDistance: false,
          });
          setMapMoveSettings({
            ...mapMoveSettings,
            mapHeigth: mapHeightUpdated,
            mapWidth: mapWidthUpdated,
          });
        }
        break;
      case "Fit":
        if (zoomLevel.level > 1) {
          setZoomLevel({ ...zoomLevel, level: 1, type: "Fit" });
          setMapMoveSettings({
            ...mapMoveSettings,
            isMoving: false,
            initialPosX: 0,
            initialPosY: 0,
            initialMouseX: 0,
            initialMousey: 0,
            posX: 0,
            posY: 0,
            mapHeigth: MAP_HEIGHT,
            mapWidth: MAP_WIDTH,
          });
          setMode({
            ...mode,
            addAp: false,
            addSwitch: false,
            moveAp: false,
            clickMode: false,
            measureDistance: false,
          });
        }
        break;
      case "Mouse":
        setMode({
          ...mode,
          addAp: false,
          addSwitch: false,
          moveAp: false,
          clickMode: true,
          measureDistance: false,
        });

        break;
      case "Move":
        if (!mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            addSwitch: false,
            moveAp: true,
            clickMode: false,
            measureDistance: false,
          });
        }
        break;
      case "addAp":
        setMode({
          ...mode,
          addAp: true,
          addSwitch: false,
          moveAp: false,
          clickMode: false,
          measureDistance: false,
        });
        break;
      case "addSwitch":
        setMode({
          ...mode,
          addAp: false,
          addSwitch: true,
          moveAp: false,
          clickMode: false,
          measureDistance: false,
        });

        break;
      case "Ruler":
        if (!mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            addSwitch: false,
            moveAp: false,
            clickMode: false,
            measureDistance: true,
          });
        }
        break;
      default:
    }
  };

  return (
    <Container>
      <TopMenu
        mode={mode}
        menuAction={handleMenuAction}
        visible={menuVisible.visible}
      />
      {mode.editing && (
        <DeviceEditBox
          closeBox={closeBox}
          setEditField={getEditFields}
          editElement={{ elementName: editingElement, elementKey: editingKey }}
          apList={apUpdatedList}
          switchList={switchUpdatedList}
          editType={editType}
        />
      )}
      <SideMenu menuAction={handleMenuAction} visible={menuVisible.visible} />
      <MapContainer
        ref={refMap}
        onClick={(e) => mapOnClick(e)}
        onMouseDown={(e) => mapOnMouseDown(e)}
        onMouseUp={(e) => mapOnMouseUp(e)}
        onMouseMove={(e) => mapOnMouseMove(e)}
        MapPosX={mapMoveSettings.posX + "px"}
        MapPosY={mapMoveSettings.posY + "px"}
        MapWidth={mapMoveSettings.mapWidth + "px"}
        MapWidth={mapMoveSettings.mapHeigth + "px"}
      >
        <SwitchContainer
          zoomLevel={zoomLevel}
          mapMoveSettings={mapMoveSettings}
          refMap={refMap}
          mouseMoveEvent={mouseMoveEvent}
          mapClickEvent={mapClickEvent}
          mode={mode}
          messageCallBack={containerMessage}
          sendSwitchesUpdatedList={getSwitchesUpdatedList}
        />

        <AccessPointContainer
          apConfigModified={apConfigModified}
          zoomLevel={zoomLevel}
          mapMoveSettings={mapMoveSettings}
          refMap={refMap}
          mouseMoveEvent={mouseMoveEvent}
          mapClickEvent={mapClickEvent}
          mode={mode}
          messageCallBack={containerMessage}
          sendApUpdatedList={getApUpdatedList}
        />
        <ResetScale
          visible={mode.measureDistance}
          messageCallBack={containerMessage}
        />
        {/*SVG Container*/}
        <svg
          height="100%"
          width="100%"
          style={{
            overflow: "hidden",
            position: "absolute",
            top: "0px",
            left: "0px",
            display: "flex",
          }}
        >
          <ScaleContainer
            mapClickEvent={mapClickEvent}
            mapMoveSettings={mapMoveSettings}
            mode={mode}
            messageCallBack={containerMessage}
            mouseMoveEvent={mouseMoveEvent}
            refMap={refMap}
            resetSignal={resetScaleSignal}
            apUpdatedList={apUpdatedList}
          />
        </svg>
        <div>
          <img src={img} draggable="false" />
        </div>
      </MapContainer>
    </Container>
  );
}

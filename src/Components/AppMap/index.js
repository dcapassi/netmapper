import React, { useState, useRef, useEffect } from "react";
import img from "./img/blueprint.png";
import AccessPointContainer from "../AccessPoint";
import ScaleContainer from "../Scale";
import { Container, MapContainer } from "./styles";
import TopMenu from "../TopMenu";
import SideMenu from "../SideMenu";
import { getDistance, pixelToMeter } from "../../Utils";

export default function AppMap() {
  //Reference passed to children to get the current map position.
  const refMap = useRef(null);

  //Map size, may be adjusted based on the img size.
  const MAP_HEIGHT = 860;
  const MAP_WIDTH = 1700;

  const containerMessage = (msg) => {
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
    }
  };

  const [menuVisible, setMenuVisible] = useState({
    visible: true,
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

  const [scaleSettings, setScaleSettings] = useState({
    point1: { x: null, y: null },
    point2: { x: null, y: null },
    measuredMapWidth: mapMoveSettings.mapWidth,
    distance: 58,
    pixelToMeter: 10,
    mapWidthMeter: (10 * 1700) / 58, // 10 is the measure in meters informed by the user
  });

  const [mode, setMode] = useState({
    zoomIn: false,
    zoomOut: false,
    addAp: false,
    measureDistance: false,
    moveMap: false,
    moveAp: false,
  });

  // Map Functions
  const mapOnMouseDown = (e) => {
    {
      if (mode.measureDistance) {
      }
      if (mode.addAp) {
        return false;
      }
      if (mode.moveMap) {
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
    }
  };
  const mapOnMouseUp = (e) => {
    e.stopPropagation();
    if (mode.addAp) {
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

    if (mode.measureDistance) {
      if (scaleSettings.point1.x === null && scaleSettings.point1.y === null) {
        try {
          setScaleSettings({
            ...scaleSettings,
            point1: { x: newPosX, y: newPosY },
            point2: { x: newPosX, y: newPosY },
          });
        } catch (error) {
          console.log(error);
        }
        return true;
      }
      if (scaleSettings.point2.x === null && scaleSettings.point2.y === null) {
        try {
          setScaleSettings({
            ...scaleSettings,
            point2: { x: newPosX, y: newPosY },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
  const mapOnMouseMove = (e) => {
    ///Set the values to the MouseMoveEvent to be used by the children elements
    setMouseMoveEvent({ ...mouseMoveEvent, x: e.clientX, y: e.clientY });

    // Measure mode second point follow the mouse;
    if (mode.measureDistance) {
      let { left, top } = refMap.current.getBoundingClientRect();
      let newPosX = e.clientX - left;
      let newPosY = e.clientY - top;
      if (scaleSettings.point1.x !== null && scaleSettings.point1.y !== null) {
        try {
          setScaleSettings({
            ...scaleSettings,
            point2: { x: newPosX, y: newPosY },
          });
        } catch (error) {
          console.log(error);
        }
      }
    }

    {
      if (mapMoveSettings.isMoving && mode.moveMap) {
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
        if (zoomLevel.level <= 20) {
          setZoomLevel({
            ...zoomLevel,
            level: zoomLevel.level + 1,
            type: "ZoomIn",
          });

          setMode({
            ...mode,
            addAp: false,
            moveAp: false,
            moveMap: false,
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
            moveAp: false,
            moveMap: false,
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
        }
        break;
      case "Mouse":
        setMode({
          ...mode,
          addAp: false,
          moveAp: false,
          moveMap: true,
          measureDistance: false,
        });

        break;
      case "Move":
        if (!mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            moveAp: true,
            moveMap: false,
            measureDistance: false,
          });
        }
        break;
      case "addAp":
        setMode({
          ...mode,
          addAp: true,
          moveAp: false,
          moveMap: false,
          measureDistance: false,
        });

        break;
      case "Ruler":
        if (!mapMoveSettings.isMoving) {
          setMode({
            ...mode,
            addAp: false,
            moveAp: false,
            moveMap: false,
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
        <AccessPointContainer
          zoomLevel={zoomLevel}
          mapMoveSettings={mapMoveSettings}
          refMap={refMap}
          mouseMoveEvent={mouseMoveEvent}
          mapClickEvent={mapClickEvent}
          mode={mode}
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
          />
        </svg>
        <div>
          <img src={img} draggable="false" />
        </div>
      </MapContainer>
    </Container>
  );
}

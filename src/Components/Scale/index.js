import React, { useState, useEffect } from "react";
import Scale from "./Scale";

function ScaleContainer(props) {
  const [scaleSettings, setScaleSettings] = useState({
    point1: { x: null, y: null },
    point2: { x: null, y: null },
    isMeasuring: false,
    measuredMapWidth: props.mapMoveSettings.mapWidth,
    distance: 58,
    pixelToMeter: 10,
    mapWidthMeter: (10 * 1700) / 58, // 10 is the measure in meters informed by the user
  });

  //UseEffect for handling click events
  useEffect(() => {
    let { left, top } = props.refMap.current.getBoundingClientRect();
    let newPosX = props.mapClickEvent.x - left;
    let newPosY = props.mapClickEvent.y - top;
    if (props.mode.measureDistance) {
      if (scaleSettings.isMeasuring) {
        setScaleSettings({ ...scaleSettings, isMeasuring: false });
        props.messageCallBack({ scale: { isMeasuring: false } });
      }

      if (!scaleSettings.isMeasuring) {
        try {
          setScaleSettings({
            ...scaleSettings,
            point1: { x: newPosX, y: newPosY },
            point2: { x: newPosX, y: newPosY },
            isMeasuring: true,
          });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [props.mapClickEvent]);

  useEffect(() => {
    setScaleSettings({
      ...scaleSettings,
      point1: { x: null, y: null },
      point2: { x: null, y: null },
    });
  }, [props.mode]);

  //UseEffect for handling mouse move events
  useEffect(() => {
    if (props.mode.measureDistance && scaleSettings.isMeasuring) {
      let { left, top } = props.refMap.current.getBoundingClientRect();
      let newPosX = props.mouseMoveEvent.x - left;
      let newPosY = props.mouseMoveEvent.y - top;
      if (scaleSettings.point1.x !== null && scaleSettings.point1.y !== null) {
        try {
          setScaleSettings({
            ...scaleSettings,
            point2: { x: newPosX, y: newPosY },
            isMeasuring: true,
          });
          props.messageCallBack({ scale: { isMeasuring: true } });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [props.mouseMoveEvent]);

  return <Scale p1={scaleSettings.point1} p2={scaleSettings.point2} />;
}

export default ScaleContainer;

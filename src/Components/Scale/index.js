import React, { useState, useEffect } from "react";
import Scale from "./Scale";
import DrawCircle from "./DrawCircle";
import { getDistance, pixelToMeter } from "../../Utils";

function ScaleContainer(props) {
  const [scaleSettings, setScaleSettings] = useState({
    point1: { x: null, y: null },
    point2: { x: null, y: null },
    isMeasuring: false,
    measuredMapMt: null,
    measuredMapPx: null,
    convertedDistance: 0,
    distance: null,
    pixelToMeter: null,
    currentMapWidth: props.mapMoveSettings.mapWidth,
    pastMapWidth: props.mapMoveSettings.mapWidth,
    //mapWidthMeter: (10 * 1700) / 58, // 10 is the measure in meters informed by the user
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
        if (!scaleSettings.measuredMapMt) {
          let inputMeter = null;
          inputMeter = prompt("Please enter the measured distance in Meters:");
          if (inputMeter) {
            const obj = {
              ...scaleSettings,
              measuredMapMt: inputMeter,
              pastMapWidth: props.mapMoveSettings.mapWidth,
              isMeasuring: false,
              measuredMapPx: getDistance(
                scaleSettings.point1.x,
                scaleSettings.point2.x,
                scaleSettings.point1.y,
                scaleSettings.point2.y
              ),
              point1: { x: null, y: null },
              point2: { x: null, y: null },
            };

            setScaleSettings(obj);
            console.log(obj);
            try {
              localStorage.setItem("scaleConfigs", JSON.stringify(obj));
            } catch (error) {
              console.log(error);
            }
          }
        }
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

  //Handling reset scale signal
  useEffect(() => {
    setScaleSettings({
      ...scaleSettings,
      point1: { x: null, y: null },
      point2: { x: null, y: null },
      isMeasuring: false,
      measuredMapMt: null,
      measuredMapPx: null,
      convertedDistance: 0,
      distance: null,
    });
  }, [props.resetSignal]);

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
            distance: getDistance(
              scaleSettings.point1.x,
              scaleSettings.point2.x,
              scaleSettings.point1.y,
              scaleSettings.point2.y
            ),
            convertedDistance:
              (scaleSettings.pastMapWidth / props.mapMoveSettings.mapWidth) *
              pixelToMeter(
                scaleSettings.measuredMapPx,
                scaleSettings.measuredMapMt,
                scaleSettings.distance
              ),
          });
          props.messageCallBack({ scale: { isMeasuring: true } });
        } catch (error) {
          console.log(error);
        }
      }
    }
  }, [props.mouseMoveEvent]);

  if (!scaleSettings.measuredMapMt) {
    try {
      const scaleConfigs = JSON.parse(localStorage.getItem("scaleConfigs"));

      if (scaleConfigs !== null && scaleConfigs.isMeasuring !== true) {
        console.log(scaleConfigs);
        setScaleSettings(scaleConfigs);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <DrawCircle
        scaleSettings={scaleSettings}
        mode={props.mode}
        apUpdatedList={props.apUpdatedList}
        currentMapWidth={props.mapMoveSettings.mapWidth}
      />
      <Scale
        scaleSettings={scaleSettings}
        p1={scaleSettings.point1}
        p2={scaleSettings.point2}
      />
    </>
  );
}

export default ScaleContainer;

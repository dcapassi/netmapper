import React, { useEffect, useState } from "react";

function TraceSwitchToAp(props) {
  const [apList, setApList] = useState([]);
  const [switchList, setSwitchList] = useState([]);
  const [radiusPx, setRadiusPx] = useState(0);
  const [clear, setClear] = useState(false);

  const getSwitchXYAndSize = (switchId) => {
    let position = { x: null, y: null, size: null };
    props.switchUpdatedList.map((entry) => {
      if (switchId != null && entry.switchName === switchId) {
        position.x = entry.posX;
        position.y = entry.posY;
        position.size = entry.switchSize;
      }
    });
    return position;
  };

  useEffect(() => {
    if (!props.mode.measureDistance) {
      setClear(false);
    } else {
      setClear(true);
    }
  }, [props.mode]);

  //UseEffect for loading the Access Points
  useEffect(() => {
    const radiusMeters = 15;
    if (
      props.mode.measureDistance === true &&
      props.scaleSettings.measuredMapPx !== null
    ) {
    }
  }, [props.scaleSettings]);

  return (
    <>
      {props.apUpdatedList != null &&
        props.switchUpdatedList &&
        props.apUpdatedList.map((entry) => {
          let obj = getSwitchXYAndSize(entry.accessSwitch);
          return (
            obj.x &&
            clear && (
              <line
                key={entry.apName}
                x1={entry.posX + entry.apSize / 2}
                y1={entry.posY + entry.apSize / 2}
                x2={obj.x + obj.size / 2}
                y2={obj.y + obj.size / 2}
                style={{ zIndex: "200", stroke: "blue", strokeWidth: 5 }}
              />
            )
          );
        })}
    </>
  );
}

export default TraceSwitchToAp;

import React, { useEffect, useState } from "react";
import { meterToPixel } from "../../Utils";
import { getDistance } from "../../Utils";
function DrawCircle(props) {
  const [apList, setApList] = useState([]);
  const [radiusPx, setRadiusPx] = useState(0);

  const [apListWithChannel, setApListWithChannel] = useState();

  //UseEffect for loading the Access Points
  useEffect(() => {
    const radiusMeters = 15;
    if (
      props.mode.measureDistance === true &&
      props.scaleSettings.measuredMapPx !== null
    ) {
      setRadiusPx(
        meterToPixel(
          props.scaleSettings.measuredMapPx,
          props.scaleSettings.measuredMapMt,
          radiusMeters
        )
      );
    }
    console.log(props.scaleSettings.pastMapWidth / props.currentMapWidth);
  }, [props.scaleSettings]);

  useEffect(() => {
    setRadiusPx(0);
  }, [props.mode]);

  useEffect(() => {
    let firstApX;
    let firstApY;
    const obj = props.apUpdatedList.map((entry, id) => {
      if (id === 0) {
        firstApX = entry.posX;
        firstApY = entry.posY;
      }
      return {
        ...entry,
        distance: parseInt(
          getDistance(
            firstApX + 15,
            entry.posX + 15,
            firstApY + 15,
            entry.posY + 15
          )
        ),
      };
    });

    const sortedArrayByDistance = obj.sort((a, b) =>
      a.distance > b.distance ? 1 : -1
    );
    let count = 0;
    let channel;
    const newArrayWithChannel = sortedArrayByDistance.map((entry) => {
      switch (count) {
        case 0:
          channel = 1;
          break;
        case 1:
          channel = 6;
          break;
        case 2:
          channel = 11;
          break;
      }

      count = count + 1;
      if (count === 3) {
        count = 0;
      }

      return {
        ...entry,
        channel,
      };
    });
    setApListWithChannel(newArrayWithChannel);
  }, [props.mode.measureDistance]);

  return (
    <>
      {apListWithChannel != null &&
        apListWithChannel.map((entry) => {
          return (
            <circle
              key={entry.apName}
              cx={entry.posX + 15}
              cy={entry.posY + 15}
              r={
                (props.currentMapWidth / props.scaleSettings.pastMapWidth) *
                radiusPx
              }
              strokeWidth={1}
              stroke={"black"}
              fill={
                entry.channel === 1
                  ? "rgb(255,0,0,0.4)"
                  : entry.channel === 6
                  ? "rgb(0,255,0,0.4)"
                  : "rgb(0,0,255,0.4)"
              }
              strokeDasharray={"5,5"}
            />
          );
        })}
    </>
  );
}

export default DrawCircle;

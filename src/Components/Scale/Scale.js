import React from "react";
import { getDistance, pixelToMeter } from "../../Utils";

function Scale(props) {
  let centerX = props.p1.x + (props.p2.x - props.p1.x) / 2;
  let centerY = props.p1.y + (props.p2.y - props.p1.y) / 2 - 10;
  let distance = props.scaleSettings.convertedDistance;
  if (!distance) {
    distance = "-";
  } else distance = distance.toFixed(2);

  return (
    <>
      <line
        x1={props.p1.x}
        y1={props.p1.y}
        x2={props.p2.x}
        y2={props.p2.y}
        style={{ stroke: "green", strokeWidth: 5 }}
      />
      <text x={centerX} y={centerY}>
        {`${distance} metros`}
      </text>
    </>
  );
}

export default Scale;

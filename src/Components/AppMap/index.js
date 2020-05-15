import React, { useState } from "react";
import img from "./img/blueprint.png";
import AccessPoint from "../AccessPoint";
import { Container } from "./styles";
import { useDrop } from "react-dnd";

export default function AppMap() {
  const [ap, setAp] = useState({
    apName: "AP001",
    posX: 30,
    posY: 30,
    apSize: 30,
    label: true,
  });

  const [{ isOver, canDrop }, dropRef] = useDrop({
    accept: "AP",
    drop: (item, monitor) => {
      const { x, y } = monitor.getClientOffset();
      const { x: initX, y: initY } = monitor.getInitialClientOffset();
      const { x: difX, y: difY } = monitor.getDifferenceFromInitialOffset();
      console.log(monitor.getClientOffset());
      console.log(monitor.getInitialClientOffset());
      console.log(monitor.getDifferenceFromInitialOffset());

      console.log(ap.posX);
      console.log(difX);
      const newPosX = ap.posX + difX;
      const newPosY = ap.posY + difY;

      console.log(newPosX);

      setAp({ ...ap, posX: newPosX, posY: newPosY });
    },
  });

  const [arrayAps, setArrayAps] = useState([]);

  const arrayTestAps = [
    {
      apName: "AP001",
      posX: "30",
      posY: "30",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP002",
      posX: "100",
      posY: "110",
      apSize: "30",
      label: true,
    },
    {
      apName: "AP003",
      posX: "300",
      posY: "25",
      apSize: "30",
      label: true,
    },
  ];

  return (
    <Container>
      <div className="backgroundContainer" ref={dropRef}>
        {arrayTestAps.map((entry) => {
          return (
            <AccessPoint
              apName={entry.apName}
              posX={entry.posX}
              posY={entry.posY}
              apSize={entry.apSize}
              label={entry.label}
              key={entry.apName}
            />
          );
        })}
        <AccessPoint
          apName={ap.apName}
          posX={ap.posX}
          posY={ap.posY}
          apSize={ap.apSize}
          label={ap.label}
          key={ap.apName}
        />

        <img src={img} draggable="false" />
      </div>
    </Container>
  );
}

import styled, { css } from "styled-components";

export const Container = styled.div.attrs((props) => ({
  style: {
    top: props.posY + "px",
    left: props.posX + "px",
    width: props.apSize + "px",
    height: props.apSize + "px",
  },
}))`
  display: flex;
  user-select: none;
  position: absolute;
  background-color: white;
  border-radius: 6px;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 150;
  overflow: visible;
  margin: 0px;

  ${(props) =>
    props.isMoving &&
    css`
      cursor: none;
    `}

  p {
    position: absolute;
    top: -25px;
    left: -5px;
    font-family: "Roboto";
  }
  svg {
    color: blue;
  }
`;

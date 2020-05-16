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
  z-index: 900;
  overflow: visible;
  margin: 0px;

  p {
    position: absolute;
    top: -25px;
    left: -5px;
    font-family: "Roboto";
  }
  svg {
    color: blue;
  }
  ${(props) =>
    props.isDragging &&
    css`
      border: 2px dashed rgba(0, 0, 0, 0.2);
      box-shadow: none;
      background: transparent;
      p,
      svg {
        opacity: 0.5;
      }
    `}
`;

import styled, { css } from "styled-components";

export const Container = styled.div.attrs((props) => ({
  style: {
    top: props.posY + "px",
    left: props.posX + "px",
    width: props.switchSize + "px",
    height: props.switchSize + "px",
  },
}))`
  display: flex;
  user-select: none;
  position: absolute;
  background-color: white;
  border-radius: 6px;
  border: 1px darkgreen solid;
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
    top: -15px;
    left: -0px;
    font-family: "Roboto";
    overflow: visible;
    width: 150px;
    font-size: 0.75rem;
  }
  svg {
    color: darkgreen;
  }
`;

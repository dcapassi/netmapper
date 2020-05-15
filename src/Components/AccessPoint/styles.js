import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  position: relative;
  top: ${(props) => props.posY + "%"};
  left: ${(props) => props.posX + "%"};
  width: ${(props) => props.apSize + "px"};
  height: ${(props) => props.apSize + "px"};
  background-color: white;
  border-radius: 6px;
  border: 1px solid;
  align-items: center;
  justify-content: center;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  z-index: 200;
  overflow: visible;

  p {
    position: absolute;
    top: -25px;
    left: -5px;
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

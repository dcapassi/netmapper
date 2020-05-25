import styled, { css } from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  top: 3%;
  z-index: 200;
  left: 42%;

  ${(props) =>
    props.visible !== true &&
    css`
      transition: opacity 0.3s ease-out;
      opacity: 0;
    `}

  div {
    display: flex;
    flex-direction: row;
    border-radius: 8px;
    padding: 2px;
    border: 1px solid gray;
    background: rgba(255, 255, 255, 0.6);

    div {
      padding: 5px;
      border-radius: 8px;
      border: none;
    }

    div:hover {
      box-shadow: none;
      background: rgba(192, 220, 243, 0.6);
    }
  }
`;

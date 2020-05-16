import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  display: flex;
  top: 15%;
  left: 45%;
  z-index: 200;

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

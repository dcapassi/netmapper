import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;

  .backgroundContainer {
    width: 500px;
    height: 500px;
    border: 1px solid black;

    img {
      width: 100%;
      height: 100%;
      user-select: none;
    }
  }
`;

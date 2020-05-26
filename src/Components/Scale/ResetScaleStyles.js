import styled, { css } from "styled-components";

export const Container = styled.div`
  button {
    user-select: none;
    display: flex;
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 200;
    ${(props) =>
      props.visible !== true &&
      css`
        display: none;
      `}
  }
`;

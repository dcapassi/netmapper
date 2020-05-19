import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  top: 0px;
`;

export const MapContainer = styled.div`
  position: relative;
  top: ${(props) => props.MapPosY};
  left: ${(props) => props.MapPosX};
  border: 1px solid gray;

  img {
    border: 1px solid gray;
    user-select: none;
    opacity: 50%;
    z-index: -1;
  }
`;

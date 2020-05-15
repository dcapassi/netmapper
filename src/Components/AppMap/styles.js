import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
`;

export const MapContainer = styled.div`
  position:relative;
  top: ${(props) => props.MapPosY};
  left: ${(props) => props.MapPosX};
  width: 1200px;
  height: 900px;
  border: 1px solid black;

  img {
    width: 100%;
    height: 100%;
    user-select: none;
  }
`;

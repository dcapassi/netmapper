import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
  background: white;
  position: relative;
  top: 0px;
`;

export const MapContainer = styled.div.attrs((props) => ({
  style: {
    top: props.MapPosY,
    left: props.MapPosX,
    width: props.MapWidth,
    height: props.MapHeight,
  },
}))`
  position: relative;
  border: 1px solid gray;

  img {
    border: 1px solid black;
    user-select: none;
    opacity: 50%;
    z-index: -1;
    width: 100%;
    height: 100%;
  }
`;

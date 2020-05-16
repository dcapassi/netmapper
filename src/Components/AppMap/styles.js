import styled from "styled-components";

export const Container = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 100vh;
  background: #ccc;
  position: relative;
  top: 0px;
`;

export const MapContainer = styled.div`
  position: relative;
  ${(props) => console.log(props)}
  top: ${(props) => props.MapPosY};
  left: ${(props) => props.MapPosX};
  border: 1px solid gray;
  width: 100%;
  height: 100%;
  img {
    border:1px solid blue;
 
    user-select: none;
    opacity:100%;
    z-index:-1;
  }
`;

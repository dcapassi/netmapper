import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 10%;
  left: 35%;
  width: 30%;
  height: 250px;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 4px;
  z-index: 300;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export const Header = styled.div`
  height: 30px;
  background-color: rgb(51, 51, 51);
  div {
    display: flex;
    justify-content: space-between;
    align-content: center;
    align-items: center;
    div {
      padding: 5px;
      svg {
        color: white;
        cursor: pointer;
      }
    }
    p {
      user-select: none;
      padding: 10px;
      font-family: "Roboto";
      font-size: 0.75rem;
      color: white;
      font-weight: bold;
    }
  }
`;
export const Body = styled.div`
  padding: 5px;
  div {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
    align-content: center;
    justify-content: space-between;

    p,
    input,
    select {
      font-family: "Roboto";
      font-weight: lighter;
      font-size: 0.75rem;
      user-select: none;
    }

    button {
      font-family: "Roboto";
      font-weight: lighter;
      font-size: 0.75rem;
      user-select: none;
      padding: 5px;
    }
  }
`;

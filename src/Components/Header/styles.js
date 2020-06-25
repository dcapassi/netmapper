import styled from "styled-components";

export const Container = styled.div`
  background-color: white;
  height: 11vh;
  padding: 5px;
  width: 100%;

  .Wrapper {
    align-items: center;
    display: flex;
    height: 100%;
    border-bottom: 1px solid #ccc;
    flex-direction: row;
    justify-content: space-between;
    box-shadow: 0px 0px 15px -7px rgba(0, 0, 0, 0.42);

    .LeftIcon {
      align-items: center;
      font-family: "Roboto";
      font-weight: bold;
      font-size: 1.3rem;
      color: navy;
      padding-left: 25px;
    }
  }

  .CenterOptions {
    align-items: center;
    display: flex;
    flex-direction: row;
    font-size: 1rem;
    font-weight: bold;
    .Options {
      padding: 25px;
    }
  }

  .RightUserConfigs {
    display: flex;
    align-items: center;

    .Avatar {
      padding-right: 20px;
      img {
        border-radius: 50%;
        border: 4px solid gray;
        width: 50px;
        height: 50px;
      }
    }
    p {
      font-family: "Roboto";
      margin-left: 10px;
      font-size: 0.8rem;
      padding-right: 10px;
    }
  }
`;

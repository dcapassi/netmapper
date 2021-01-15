import styled from "styled-components";
import logo from "../../static/bg.jpg";

export const LoginComponent = styled.div`
  * {
    border: 0px;
    padding: 0px;
    margin: 0px;
    align-items: center;
  }

  background-image: url(${logo});
  background-size: cover;
  background-position: center 0;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;

  #mensagemFalhaAutenticacao {
    color: red;
    font-family: "Open Sans";
    font-size: 12px;
  }


  .Container {
    overflow: hidden;
    background-color: white;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    padding: 5% 5% 5% 5%;
    border: 1px solid #cccccc;
    width: 30%;
    position: absolute;
    top: 25%;
    left: 35%;
  }

  h1 {
    font-family: "Open Sans";
    font-size: 150%;
    margin-left: 3%;
    text-align: center;
    color: #044c8c;
  }

  img {
    display: block;
    padding: 5% 10% 1% 5%;
    width: 45%;
    height: 50%;
    margin-left: 25%;
    margin-right: auto;
  }

  a {
    text-align: center;
    font-family: "Open Sans";
    font-size: 10px;
    line-height: 22px;
    text-align: center;
    color: #044c8c;
  }

  p {
    text-align: center;
    font-family: "Open Sans";
    font-size: 12px;
    line-height: 22px;
    text-align: center;
    color: #044c8c;
    padding: 0% 5% 10% 5%;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  ::placeholder {
    color: #044c8c;
  }

  input {
    outline: none;
    font-family: "Open Sans";
    width: 60%;
    font-size: 12px;
    border-style: none;
    border-bottom: 1px solid #fd5f00;
    text-align: center;
    margin-bottom: 15px;
  }

  #loginBotao {
    font-size: 10px;
    color: #044c8c;
    margin-bottom: 2%;
    margin-top: 2%;
    background: #ffffff;
    border: 1px solid #fd5f00;
    box-sizing: border-box;
    box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    width: 40%;
    padding: 1%;
    cursor: pointer;
  }

  #loginBotao:hover {
    background-color: #fcc29e;
  }
  #loginBotao:active {
    background-color: #fd995b;
  }
`;

import React, { Component } from "react";
import logo from "../../static/logoILib.png";
import api from "../../API/backend/api";
import history from "../../API/backend/history";
import { LoginComponent } from "../Login/styles";
import { connect } from "react-redux";

var usuarioLogado = false;

class Login extends Component {
  enviarCredenciais = async (e) => {
    e.preventDefault();

    const usuario = document.getElementById("loginUsuario").value;
    const senha = document.getElementById("loginSenha").value;
    const { dispatch } = this.props;

    const data = await api
      .post("/sessao", {
        email: usuario,
        senha: senha,
      })
      .then(function (response) {
        console.log(response);
        usuarioLogado = true;
        dispatch({
          type: "@user/LOGGED",
          response,
        });
        history.push("/MenuPrincipal");
      })
      .catch(function (response) {
        console.log("got hereee oddd!");
        console.log(response);
        //document.getElementById("mensagemFalhaAutenticacao").innerText = "Usuário ou senha incorretos";
      });
  };

  handleChange = async (e) => {
    document.getElementById("mensagemFalhaAutenticacao").innerText = "";
  };

  render() {
    return (
      <LoginComponent>
        <div className="App">
          <div className="Container">
            <h1>NetMapper</h1>
            <p>Monitor and see it.</p>
            <form>
              <input
                autocomplete="off"
                type="text"
                placeholder="Usuário"
                id="loginUsuario"
                onChange={this.handleChange}
              ></input>
              <input
                autocomplete="off"
                type="password"
                placeholder="Senha"
                id="loginSenha"
                onChange={this.handleChange}
              ></input>
              <div id="mensagemFalhaAutenticacao"></div>
              <input
                type="submit"
                id="loginBotao"
                value="Acessar"
                onClick={this.enviarCredenciais}
              ></input>

              <a href="#">Esqueci minha senha</a>
              <a href="#">Não sou cadastrado</a>
            </form>
          </div>
        </div>
      </LoginComponent>
    );
  }
}

export default connect()(Login);

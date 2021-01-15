import React from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

function RouteWrapper({ component: Component, isPrivate, user, ...resto }) {
  let usuarioLogado = false;

  if (user.nome != undefined) {
    usuarioLogado = true;
  }

  const logado = usuarioLogado;

  if (!logado && isPrivate) {
    return <Redirect to="/" />;
  }
  if (logado && !isPrivate) {
    return <Redirect to="/MenuPrincipal" />;
  }

  return <Route {...resto} component={Component} />;
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    .isRequired,
};

RouteWrapper.defaultProps = {
  isPrivate: false,
};
const mapState = (state) => ({
  user: state.user,
});
export default connect(mapState)(RouteWrapper);
import React, { Component } from "react";
import "./App.css";
import "./styles/main.scss";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import DashBoard from "./containers/Dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className={"App"}>
        <Switch>
          <Route /*exact*/ path={"/"} component={DashBoard} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};
export default withRouter(connect(mapStateToProps)(App));

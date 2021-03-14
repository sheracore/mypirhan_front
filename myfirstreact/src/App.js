import React, { Component, Suspense } from "react";
import { Route, Switch, Router } from "react-router";
import history from "./history";
import DefaulLayout from "./Container/Layout/DefaultLayout/index.js";

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route
            exact={false}
            path="/"
            render={(props) => <DefaulLayout {...props} />}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

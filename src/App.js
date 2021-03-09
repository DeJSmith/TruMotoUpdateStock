import React, { useState } from "react";
import "./scss/index.scss";
import ProcessProvider from "./context/ProcessContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Stock, Product, Nav } from "./components";

const App = () => {
  return (
    <>
      <Router>
        <Nav />
        <ProcessProvider>
          <div className="container">
            <Switch>
              <Route exact path="/stock" component={Stock} />
              <Route exact path="/product" component={Product} />
            </Switch>
          </div>
        </ProcessProvider>
      </Router>
    </>
  );
};

export default App;

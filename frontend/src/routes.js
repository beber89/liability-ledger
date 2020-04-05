import React from "react";
import { Route } from "react-router-dom";
import Hoc from "./hoc/hoc";

import HomepageLayout from "./containers/Home";
import WorkerspageLayout from "./containers/Workers";






const BaseRouter = () => (
  <Hoc>
    <Route exact path="/" component={HomepageLayout} />
    <Route exact path="/workers" component={WorkerspageLayout} />
  </Hoc>
);

export default BaseRouter;

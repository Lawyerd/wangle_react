import React from "react";
import { Route, Switch } from "react-router-dom";
import User_list from "./User_list.js";
import Detail from "./User_detail.js";
import Create from "./User_create.js";
import Update from "./User_update.js";
function User({ match }) {
  console.log(match.path);
  return (
    <>
      <Switch>
        <Route exact path={`${match.path}/create`} component={Create} />
        <Route exact path={`${match.path}/update/:id`} component={Update} />
        <Route exact path={`${match.path}/:id`} component={Detail} />
        <Route exact path={`${match.path}`} component={User_list} />
      </Switch>
    </>
  );
}

export default User;

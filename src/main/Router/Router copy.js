import React, { Component } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

// import HomeContent from "../HomeContent";
import NotFoundContent from "../../shared/components/NotFoundContent/";

import { routes } from "../main/routes";


const Login = React.lazy(() => import('../../master/Login/login'));
const Dashboard = React.lazy(() => import("../DashBoard/Dashbaord"));

class Router extends Component {
  constructor(props) {
    super(props);

  }
  

  render() {
    // Properties
    const { user, roles } = this.props;
    const { classes} = this.props;
    // Functions
    const { openSnackbar } = this.props;

    return (
          <Switch>
            <Route path="/login" exact render={()=>{
              // {this.props.appConfig.getAppConfig("showLayout") && this.props.appConfig.SetAppConfig("showLayout",false)}
              return  (<Login user={user} openSnackbar={openSnackbar} appConfig={this.props.appConfig} />)
            }}>
              {/* <Dashboard user={user} openSnackbar={openSnackbar} /> */}
              
              
            </Route>
            <Route path="/" exact>
            {user && roles.includes("admin") ? (
                <Dashboard />
              ) : (
                  <Redirect to="/login" />
                )}
            </Route>
            {/* <Route path="/dashboard" exact>
            {user && roles.includes("admin") ? (
                <Dashboard />
              ) : (
              <Dashboard user={user} openSnackbar={openSnackbar} />
              (
                <Redirect to="/login" />
              )}
            </Route> */}
            {Object.entries(routes).map(([key, values]) => {
              let route=<Route path={values.url} component={values.component}></Route>
              if(!user){
                <Redirect to="/login" />
              }
              return (route)
            })}

            {/* <Route path="/admin">
              {user && roles.includes("admin") ? (
                <Dashboard />
              ) : (
                  <Redirect to="/" />
                )}
            </Route> */}
            <Route>
              <NotFoundContent />
            </Route>
          </Switch>
    );
  }
}

Router.propTypes = {
  // Properties
  user: PropTypes.object,
  roles: PropTypes.array.isRequired,
  bar: PropTypes.element,

  // Functions
  openSnackbar: PropTypes.func.isRequired
};

export default Router;

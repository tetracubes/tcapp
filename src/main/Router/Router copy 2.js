import React, { Component } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import { BrowserRouter, Switch, Redirect, Route } from "react-router-dom";

// import HomeContent from "../HomeContent";
import NotFoundContent from "../../shared/components/NotFoundContent/";

import { routes } from "../main/routes";

import {menuJson} from"../../mock/menu";



const Login = React.lazy(() => import('../../master/Login/login'));
const Dashboard = React.lazy(() => import("../DashBoard/Dashbaord"));

class Router extends Component {
  constructor(props) {
    super(props);

  }
  

  render() {
    // Properties
    const user = this.props.appConfig.getAppConfig("user");
    const { classes} = this.props;
    // Functions
    // const { openSnackbar } = this.props;
    // const authUserinfo=AuthService.getUserInfo()
    // this.props.appConfig.setAppConfig(user)
    return (
          <Switch>
            <Route path="/login" exact key="login">
              {!user ?
                <Login appConfig={this.props.appConfig} /> :
                <Redirect to="/dashboard" />
              }
              
            </Route>
            <Route path="/" exact key="emptypath"> 
              {user? (<Dashboard />) : (<Redirect to="/login" key="redirectlogin" />)}
            </Route>
            {/* {Object.entries(routes).map(([key, values]) => { */}
              {menuJson.map((row)=>{
                let route=<Route path={row.url} component={row.component} exact appConfig={this.props.appConfig} key={row.menu + "-route"}/>

                if(!user){
                  return(<Redirect to="/login" key="redirectlogin"/>)
                }
                return (route)  
              })}
               {/* let route=<Route path={values.url} component={values.component} exact appConfig={this.props.appConfig} key={key + "-route"}/>
              if(!user){
                return(<Redirect to="/login" key="redirectlogin"/>)
              }
              return (route)
            })} */}
            <Route  key="redirectnotfound">
              <NotFoundContent/>
            </Route>
          </Switch>
    );
  }
}

// Router.propTypes = {
//   // Properties
//   user: PropTypes.object,
//   roles: PropTypes.array.isRequired,
//   bar: PropTypes.element,

//   // Functions
//   openSnackbar: PropTypes.func.isRequired
// };

export default Router;

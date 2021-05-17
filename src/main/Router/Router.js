import React, { Component, useEffect, useState } from "react";

import PropTypes from "prop-types";
import classNames from "classnames";

import { Switch, Redirect, Route, useRouteMatch } from "react-router-dom";

// import HomeContent from "../HomeContent";
import NotFoundContent from "../../shared/components/NotFoundContent/";

import { routes } from "../main/routes";

import { menuJson } from "../../mock/menu";
import AuthService from "../../services/AuthService";
import _ from "lodash";
import NotAuthorisedContent from "../../shared/components/NotAuthorisedContent";


const Login = React.lazy(() => import('../../master/Login/login'));
const Dashboard = React.lazy(() => import("../DashBoard/Dashbaord"));


const Router = (props) => {
  const [loaded, setLoaded] = useState(false);

  // let match = useRouteMatch();

  useEffect(() => {
    setLoaded(false)
    if (props.appConfig.getAppConfig("user") == null) {
      let userinfo = AuthService.getUserInfo();
      if (userinfo !== null) {
        props.appConfig.SetAppConfig("user", userinfo.data.UserDetails);
        setLoaded(true);
      } else {
        setLoaded(true);
      }

    }

  }, [])

  const user = props.appConfig.getAppConfig("user");
  const { classes } = props;


  return (<>{loaded && <Switch>
    <Route path="/login" exact key="login">
      {!user ?
        <Login appConfig={props.appConfig} /> :
        <Redirect to="/dashboard" />
      }

    </Route>
    <Route path="/" strict exact key="emptypath">
      {user ? (<Dashboard appConfig={props.appConfig} />) : (<Redirect to="/login" key="redirectlogin" />)}
    </Route>
    <Route path="/dashboard" exact key="dashboard">
      {user ? (<Dashboard appConfig={props.appConfig} />) : (<Redirect to="/login" key="redirectlogin" />)}
    </Route>

    {menuJson.map((row) => {
      const Component = row.getComponent//(props.appConfig);
      if (props.appConfig.getAppConfig("user")) {
        let valid=false;
        let authList=[];
        if(props.appConfig.getAppConfig("user")["usercode"].toUpperCase()=="ADMIN"){
            valid=true;
        }
        if(valid==false){
          let menurights = props.appConfig.getAppConfig("user")["menurights"];
          authList= _.filter(menurights, { "menu": row["menu"] })
          if(authList.length>0){
            valid=true
          }
        }
        if(valid){
          let route = <Route path={row.url}
            render={(rProps) => <Component authList={authList} appConfig={props.appConfig} {...rProps} key={row.menu + "-comp-route"}/>}
            exact key={row.menu + "-route"} />
          if (!user) {
            return (<Redirect to="/login" key="redirectlogin" />)
          }
          return (route)
        }else{
          return(<Route key="redirectnotAuthorised">
          <NotAuthorisedContent/>
        </Route>)
        }
      }
    })}
    <Route key="redirectnotfound">
    {!user ?
        <Redirect to="/login" key="redirectlogin" /> :
        <NotFoundContent />
      }
    </Route>
  </Switch>}
  </>);
}

export default Router;

// class Router extends Component {
//   constructor(props) {
//     super(props);

//   }
//   componentDidMount() {

//   }


//   // checkUserInfo=()=>{
//   //   if(this.props.appConfig.getAppConfig("user")==null){
//   //     let userinfo=AuthService.getUserInfo()
//   //     this.props.appConfig.SetAppConfig("user",userinfo.data.UserDetails)
//   //     return userinfo.data.UserDetails;
//   //   }

//   //   return null
//   // }



//   render() {
//     // let match = useRouteMatch();
//     // console.log(match);
//     // Properties
//     const user = this.props.appConfig.getAppConfig("user");
//     const { classes} = this.props;


//     // Functions
//     // const { openSnackbar } = this.props;
//     // const authUserinfo=AuthService.getUserInfo()
//     // this.props.appConfig.setAppConfig(user)
//     return (
//           <Switch>
//             <Route path="/login" exact key="login">
//               {!user ?
//                 <Login appConfig={this.props.appConfig} /> :
//                 <Redirect to="/dashboard" />
//               }

//             </Route>
//             <Route path="/" exact key="emptypath"> 
//               {user? (<Dashboard />) : (<Redirect to="/login" key="redirectlogin" />)}
//             </Route>
//             <Route path="/dashboard" exact key="dashboard"> 
//               {user? (<Dashboard />) : (<Redirect to="/login" key="redirectlogin" />)}
//             </Route>

//             {menuJson.map((row)=>{
//               let route=<Route path={row.url} component={row.component} exact appConfig={this.props.appConfig} key={row.menu + "-route"}/>

//               if(!user){
//                 return(<Redirect to="/login" key="redirectlogin"/>)
//               }
//               return (route)  
//             })}
//             <Route  key="redirectnotfound">
//               <NotFoundContent/>
//             </Route>
//           </Switch>
//     );
//   }
// }

// // Router.propTypes = {
// //   // Properties
// //   user: PropTypes.object,
// //   roles: PropTypes.array.isRequired,
// //   bar: PropTypes.element,

// //   // Functions
// //   openSnackbar: PropTypes.func.isRequired
// // };

// export default Router;

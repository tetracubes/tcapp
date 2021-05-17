import React from "react";
import classNames from "classnames";
//Material-Ui
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "../DashBoard/Dashbaord";
import { routes } from "./routes";

// JSS
// Context State
const Main = ({ classes }) => {
  
  return (
    <>
       <Suspense fallback={<Fragment />}>
       <Switch>
        {/* <Suspense fallback={<FallbackSpinner name="LOAD_UI" />}> */}
            <Route path="/" exact component={Dashboard}></Route>
            {Object.entries(routes).map(([key,values])=>{
                <Route path={values.url} component={values.component}></Route>
            })}
          {/* <Route path="/" exact component={Dashboard} /> */}
          {/* <Route path={ROUTES.LOGOUT.url} component={Logout} /> */}
          {/* <Route path="" component={PageNotFound} /> */}
        {/* </Suspense> */}
      </Switch>
        </Suspense>
    </>
  );
};

export default Main;

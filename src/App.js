import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import CssBaseline from "@material-ui/core/CssBaseline";
import Snackbar from "@material-ui/core/Snackbar";
import { MuiThemeProvider } from "@material-ui/core/styles";
import MuiAlert from '@material-ui/lab/Alert';
import React, { Component, Fragment, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import readingTime from "reading-time";
import './App.css';
import GlobalStyles from "./GlobalStyles";
import Header from "./main/main/header";
import appearance from "./services/appearance";
import AuthService from "./services/AuthService";
import ErrorBoundary from "./shared/components/ErrorBoundary/ErrorBoundary";
import LaunchScreen from "./shared/components/LaunchScreen/LaunchScreen";
import Loader from "./shared/components/Loader/Loader";



library.add(fab, far, faEdit)

const Login = React.lazy(() => import('./master/Login/login'));


const initialState = {
  ready: true,
  theme: appearance.defaultTheme,
  user: null,
  showLayout: true,
  snackbar: {
    autoHideDuration: 0,
    message: "",
    open: false,
    severity: "info",
  }
};

// severity	'error'
// | 'info'
// | 'success'
// | 'warning'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }

  componentDidMount() {
    let userdata = AuthService.getUserInfo();
    if (userdata && userdata.data.UserDetails)
      this.setState({ user: userdata.data.UserDetails });
  }


  resetState = callback => {
    this.setState(
      {
        ready: true,
        theme: appearance.defaultTheme,
        user: null,
        showLayout: true,

      },
      callback
    );
  };

  setTheme = (theme, callback) => {
    if (!theme) {
      this.setState(
        {
          theme: appearance.defaultTheme
        },
        callback
      );

      return;
    }

    this.setState(
      {
        theme: appearance.createTheme(theme)
      },
      callback
    );
  };


  openSnackbar = (message, severity = "info", autoHideDuration = 2, callback) => {
    this.setState(
      {
        snackbar: {
          autoHideDuration: readingTime(message).time * autoHideDuration,
          message,
          open: true,
          severity: { severity }
        }
      },
      () => {
        if (callback && typeof callback === "function") {
          callback();
        }
      }
    );
  };

  closeSnackbar = (clearMessage = false) => {
    const { snackbar } = this.state;

    this.setState({
      snackbar: {
        message: clearMessage ? "" : snackbar.message,
        open: false
      }
    });
  };

  // SetUserData=(userData=null,user=null,roles=[])=>{
  //   this.setState({"user":user,userData:userData,"roles":roles})
  // }

  SetAppConfig = (name, value) => {
    let obj = {};
    obj[name] = value
    if (name) {
      this.setState(Object.assign(this.state, obj))
    }
  }

  getAppConfig = (name) => {
    return this.state[name]
  }

  render() {

    const { snackbar } = this.state;
    return (
      <Fragment>
        <Suspense fallback={<Loader name="LOAD_UI" />}>
        {/* "homepage": "https://srushti.net.in", */}
        {/* REACT_APP_HOMEPAGE REACT_APP_ROUTER_BASE*/}
          <BrowserRouter history basename={process.env.REACT_APP_HOMEPAGE || ''}>
            <MuiThemeProvider theme={this.state.theme}>
              {/* Roboto is used by Material-UI, Baloo+Bhaijaan is used for the brand
          name in the navigation */}
              <CssBaseline />
              <ErrorBoundary>
                {!this.state.ready && <LaunchScreen />}
                <GlobalStyles />
                <Header appConfig={this} />
                <Snackbar
                  autoHideDuration={snackbar.autoHideDuration}
                  // message={snackbar.message}
                  open={snackbar.open}
                  onClose={this.closeSnackbar}
                  severity={snackbar.severity}
                >
                  <Alert onClose={this.closeSnackbar} severity="success">
                    {snackbar.message}
                    {/* import MuiAlert from '@material-ui/lab/Alert' */}
                  </Alert>
                </Snackbar>
              </ErrorBoundary>
            </MuiThemeProvider>
          </BrowserRouter>
        </Suspense>
      </Fragment>

    );
  }
}
export default App;

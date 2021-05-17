import React, { useEffect, Component } from 'react';
import clsx from 'clsx';
import * as _ from "lodash"
import { makeStyles, useTheme, withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';

import Footer from "./footer"

import { withRouter } from "react-router-dom";

import Router from "../Router/Router";
import AuthService from '../../services/AuthService';
import MenuList from "./menulist";
import menuJson from "../../mock/menu"


const drawerWidth = 240;

const useStyles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(2),
    // padding:"15px 2px",
  },
  list: {
    width: 250,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  large: {
    width: theme.spacing(24),
    height: theme.spacing(7),
    background:"white",
    borderRadius: "4px",
    marginRight: "2px",
    padding: "2px",
  },
});

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      appConfig: undefined,
      userInfo: false
    }


  }

  componentDidMount() {
    // this.props.appConfig=this.props.appConfig
    // this.setState(prevState => {
    //   return { appConfig: this.props.appConfig };
    // });
  }


  handleDrawerOpen = () => {
    this.setState(prevState => {
      return { open: true };
    });

  };

  handleDrawerClose = () => {
    this.setState(prevState => {
      return { open: false };
    });
  };


  handleUserDrawerOpen = () => {
    this.setState(prevState => {
      return { userInfo: true };
    });

  };

  handleUserDrawerClose = () => {
    this.setState(prevState => {
      return { userInfo: false };
    });
  };

  logout = () => {
    this.props.appConfig.SetAppConfig("user", null)
    AuthService.logOut()
    this.handleUserDrawerClose();
    // this.props.history.push('/');
  }

  updateAppConfig = (name, value) => {
    this.props.appConfig.SetAppConfig(name, value)
  }

  handleMenu = (e) => {
    alert(e.target.textContent);
  }


  getMenuList = () => {
    
    return <MenuList appConfig={this.props.appConfig} drawerOpen={this.state.open} history={this.props.history}/>;
  }

  getUserInfoList = () => {
    const { classes } = this.props;
    let userData = this.props.appConfig.getAppConfig("user") || {};
    let data = (<div
      className={classes.list}
      role="presentation"
      onClick={this.handleUserDrawerClose}
      onKeyDown={this.handleUserDrawerClose}
    >
      <List key={"Setting-list-Head "}>
        {Object.keys(userData).map((key) => {
          if (key == "usercode" || key == "emailid") {
            return (<React.Fragment key={Math.random(1000)}>
              <ListItem button key={userData[key] + "-list-" + key}>
                <ListItemText primary={key} key={userData[key] + "-listitemtext-" + key} secondary={
                  <React.Fragment>
                    <Typography
                      noWrap
                      component="span"
                      variant="overline"
                      // className={classes.inline}
                      color="textPrimary"
                    >
                      {userData[key]}
                    </Typography>
                  </React.Fragment>}>
                </ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" key={userData[key] + "-Divider-" + key} />
            </React.Fragment>
            )
          }
        })}

        <Divider />

        <ListItem style={{ color: "red" }} button key={"logout"} onClick={this.logout} color="secondary" key={"listiem-logout"}>
          <ListItemText primary={"Log Out"} />
        </ListItem>
        <Divider />
        <ListItem button key={"close"} onClick={this.handleUserDrawerClose} key={"lisitem-close"}>
          <ListItemText primary={"Close"} />
        </ListItem>
      </List>

    </div>)
    return data;
  }


  render() {
    const { classes } = this.props;
    const theme = this.props;
    const user = this.props.appConfig.getAppConfig("user");
    return (

      <div className={classes.root}>
        {this.props.appConfig && this.props.appConfig.getAppConfig("showLayout") && <CssBaseline />}
        {this.props.appConfig && this.props.appConfig.getAppConfig("showLayout") &&
          <AppBar
            position="fixed"
            className={clsx(classes.appBar, {
              [classes.appBarShift]: this.state.open,
            })}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={this.handleDrawerOpen}
                edge="start"
                className={clsx(classes.menuButton, {
                  [classes.hide]: this.state.open,
                })}
              >
                <MenuIcon />
              </IconButton>
              <Avatar alt="CBS" src={process.env.PUBLIC_URL + "/img/shrushti_logo.jpg"} 
              variant="square" className={classes.large} key={"companyLogo"}/>
              <Typography variant="h6" noWrap className={classes.title}>
                Poject Management System (PMS)
            </Typography>
              <div className={classes.grow}>

              </div>
              <Typography variant="subtitle2">
                {this.props.appConfig.state.user ? this.props.appConfig.state.user.usercode : "No User info"}
              </Typography>
              {/* <div> */}
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={"useraccountinfo"}
                aria-haspopup="true"
                onClick={this.handleUserDrawerOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              {/* </div> */}
            </Toolbar>
          </AppBar>
        }
        {this.props.appConfig && this.props.appConfig.getAppConfig("showLayout") &&
          <Drawer
            variant="permanent"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: this.state.open,
                [classes.drawerClose]: !this.state.open,
              }),
            }}
          >
            <div className={classes.toolbar}>
              <IconButton onClick={this.handleDrawerClose}>
                {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
              </IconButton>
            </div>
            <Divider />
            {this.getMenuList()}
          </Drawer>
        }
        <main className={classes.content}>
          {this.props.appConfig && this.props.appConfig.getAppConfig("showLayout") && <div className={classes.toolbar} />}
          
          {/* <Router basename={process.env.REACT_APP_PUBLIC_URL} appConfig={this.props.appConfig} /> */}
          <Router appConfig={this.props.appConfig} />
          <Footer appConfig={this} />
        </main>
        {this.state.userInfo &&
          <Drawer anchor="right" open={this.state.userInfo} onClose={this.handleDrawerClose}>
            {this.getUserInfoList()}
          </Drawer>}
      </div>
    );
  }
}

export default withRouter(withStyles(useStyles, { withTheme: true })(Header));

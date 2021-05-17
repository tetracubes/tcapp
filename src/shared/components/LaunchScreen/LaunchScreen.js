import React, { Component } from "react";

import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from '@material-ui/core/Backdrop';

const styles = theme => ({
  center: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    textAlign: "center"
  },backdrop: {
    zIndex: 99999,
    color: '#fff',
    
},
});

class LaunchScreen extends Component {
  render() {
    // Styling
    const { classes } = this.props;

    return (
      <Backdrop className={classes.backdrop} open={true}>
        <CircularProgress color="inherit" />
        <h4>Loading.................</h4>
    </Backdrop>
      // <div className={classes.center}>
      //   <CircularProgress />
      // </div>
    );
  }
}

LaunchScreen.propTypes = {
  // Styling
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LaunchScreen);

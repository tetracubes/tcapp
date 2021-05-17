import React from "react";
// material ui
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
import DeleteIcon from "@material-ui/icons/Delete";
import NavigateNext from "@material-ui/icons/NavigateNext";
const styles = theme => ({
  button: {
    margin: theme.spacing(1)
  },
  leftIcon: {
    marginRight: theme.spacing(1)
  },
  rightIcon: {
    marginLeft: theme.spacing(1)
  },
  iconSmall: {
    fontSize: 20
  },
  color: {
    backgroundColor: "#0461FB"
  }
});

const BasicButton = ({
  classes,
  name,
  handleClick,
  dispName = name,
  color
}) => {
  return (
    <Button
      variant="contained"
      className={classes.button}
      onClick={handleClick}
      name={name}
      id={name}
      color="primary"
    >
      {dispName}
    </Button>
  );
};

export default withStyles(styles)(BasicButton);


import React, { Fragment } from "react";
// material ui
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import { withStyles } from "@material-ui/core/styles";
import AddCircle from "@material-ui/icons/AddCircle";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import "./expandbutton-styles.css";
const styles = theme => ({
    button: {
        margin: theme.spacing(0.5),
    },
    addIcon: {
        marginLeft: theme.spacing(0.5)
    },
    iconSmall: {
        fontSize: 20
    },
    spacing: {
        margin: theme.spacing(0.5)
    },
    buttonIcon: {
        // margin: theme.spacing(1),
        // width: "30px",
        // height: "30px"
    },

});

const ButtonComponent = ({
    classes,
    name,
    dispName = name,
    handleClick,
    type = "normal",
    title = "Add",
    fontSize = "small",
    levelData = {},
    ...rest
}) => {

    const buttonHandleClick = (e) => {
        if (handleClick) {
            e.levelData = levelData;
            handleClick(e)
        }
    }
    return (
        <Fragment>
            {type === "normal" && (
                <Button
                    id={name}
                    name={name}
                    className={classes.button}
                    variant="contained"
                    onClick={buttonHandleClick}
                    size={fontSize}
                    color="default"
                    {...rest}
                >
                    <AddCircle className={classes.addIcon} fontSize={fontSize} />
                    <span className={classes.spacing}>{dispName}</span>
                </Button>
            )}
            {type === "floating" && (
                <Fab
                    id={name}
                    name={name}
                    variant="extended"
                    aria-label="Delete"
                    className={classes.button}
                    onClick={buttonHandleClick}
                    size={fontSize}
                    {...rest}
                >
                    <AddCircle className={classes.addIcon} fontSize={fontSize} />
                    {dispName}
                </Fab>
            )}
            {type === "icon" && title === "copy" && (
                <IconButton
                    aria-label={name}
                    className={classes.buttonIcon}
                    onClick={buttonHandleClick}
                    name={name}
                    {...rest}
                    id={name}
                    color="default"
                >
                    <FileCopyIcon fontSize="small" />
                </IconButton>
            )
            }
            {type === "icon" && title === "delete" && (
                <IconButton
                    aria-label={name}
                    className={classes.buttonIcon}
                    onClick={buttonHandleClick}
                    name={name}
                    {...rest}
                    id={name}
                    color="default"
                >
                    <DeleteIcon fontSize={fontSize} />
                </IconButton>
            )
            }
            {type === "expandable" && (
                <Button
                    className="MuiButtonBase-root MuiButton-root MuiButton-contained MuiButton-containedDefault MuiButton-containedSizeSmall MuiButton-sizeSmall expand-root"
                    id={name}
                    name={name}
                    // style={classes.expandButton}
                    variant="contained"
                    onClick={buttonHandleClick}
                    size={fontSize}
                    color="default"
                    {...rest}
                >
                    {title === "ADD" && <AddCircle fontSize={fontSize} />}
                    {(title === "DELETE" || title === "DELETEALL") && <DeleteIcon fontSize={fontSize} />}
                    {title === "COPY" && <FileCopyIcon fontSize="small" />}
                    <span className="expand-content">
                        {dispName}</span>
                </Button>
            )}
        </Fragment >
    );
};

export default withStyles(styles)(ButtonComponent);

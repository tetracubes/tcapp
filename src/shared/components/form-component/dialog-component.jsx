import React from "react";
import Button from '@material-ui/core/Button';
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";

const styles = {
    dialogPaper: {
        minHeight: "80vh",
        maxHeight: "80vh"
    }
};

export const Transition = React.forwardRef((props, ref) => (
    <Slide direction='up' {...props} ref={ref} />
))
// function Transition(props) {
//   return <Slide direction="up" {...props} />;
// }

const DialogComponent = ({
    classes,
    children,
    popUpModalState,
    handlePopUpClose,
    handlePopUpSave,
    name,
    description = "title required",
    maxWidth = "md",
    cancelText = "Cancel",
    confirmText = "Confirm",
    cancelBtnName = "Cancel",
    confirmBtnName = "Confirm",
    ...rest
}) => {
    // const handleClose = () => {
    //     if (handlePopUpClose) {
    //         this.handlePopUpClose()
    //     }
    // };
    return (
        <Dialog
            {...rest}
            open={popUpModalState}
            onClose={handlePopUpClose}
            aria-labelledby={name}
            TransitionComponent={Transition}
            fullWidth={true}
            maxWidth={maxWidth}
            classes={{ paper: classes.dialogPaper }}
        >
            <DialogTitle id={name}>{description}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button name={confirmBtnName} onClick={handlePopUpSave} color="primary">{confirmText}</Button>
                <Button name={cancelBtnName} onClick={handlePopUpClose} color="primary">{cancelText}</Button>
            </DialogActions>
        </Dialog>
    );
};
export default withStyles(styles)(DialogComponent);
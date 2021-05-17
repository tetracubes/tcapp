import React from "react";
import BasicButton from "../basic-button/basic-button";
import Slide from "@material-ui/core/Slide";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from "@material-ui/core/styles";
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

const DialogModal = ({
  classes,
  children,
  popUpModalState,
  handlePopUpClose,
  handlePopUpSave,
  name,
  description = "title required",
  maxWidth = "xl",
  cancelText = "Cancel",
  confirmText = "Confirm",
  cancelBtnName = "Cancel",
  confirmBtnName = "Confirm",
  
  fullScreen,
  ...rest
}) => {
    const theme = useTheme();
    const lFullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    if(fullScreen===null || fullScreen===undefined){
        fullScreen=lFullScreen
    }
    

  return (
    <Dialog
      {...rest}
      fullScreen={fullScreen}
      open={popUpModalState}
      onClose={handlePopUpClose}
      aria-labelledby={name}
      TransitionComponent={Transition}
      fullWidth={true}
      maxWidth={maxWidth}
      classes={{ paper: classes.dialogPaper }}
    >
      <DialogTitle id={name} disableTypography={true}>{description}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {handlePopUpSave &&
        <BasicButton name={confirmBtnName} handleClick={handlePopUpSave}>
          {confirmText}
        </BasicButton>}
        <BasicButton name={cancelBtnName} handleClick={handlePopUpClose}>
          {cancelText}
        </BasicButton>
      </DialogActions>
    </Dialog>
  );
};
export default withStyles(styles)(DialogModal);

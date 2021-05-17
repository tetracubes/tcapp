// react library
import React, { useState } from "react";
// material ui
import { withStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddCircle from "@material-ui/icons/AddCircle";
import RemoveCircle from "@material-ui/icons/RemoveCircle";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";

const styles = theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  details: {
    flexDirection: "column",
    alignItems: "flex-start"
  }
});

const Accordion = ({ classes, children, summary, color, styles }) => {
  const [expanded, setExpanded] = useState(true);
  const handleChange = panel => (event, expand) => {
    setExpanded(!expand);
  };
  let style = Object.assign({ background: color, height: "40px", minHeight: "unset", border: "none" }, styles)
  return (
    <ExpansionPanel square onChange={handleChange(expanded)} >
      <ExpansionPanelSummary style={style} expandIcon={<ExpandMoreIcon />}>
        <div style={{ "marginLeft": "-15px", "marginRight": "5px" }}>{(expanded ? <AddCircle /> : <RemoveCircle />)}</div>
        <div className={classes.heading}><b>{summary}</b></div>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.details}>
        {expanded === false ? children : ""}
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
};

export default withStyles(styles)(Accordion);

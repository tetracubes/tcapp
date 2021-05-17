import React from "react";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
// JSS
// Context State
const Footer = () => {

  return (
    // <div>
    <footer role="contentinfo" aria-label="TETRACUBES">

      <Box mt={5}>
      <Typography variant="body2" color="textSecondary" align="center">
          Powerd By TetraCubes.
        </Typography>
      </Box>
    </footer>
    // </div>
  );
};

export default Footer;

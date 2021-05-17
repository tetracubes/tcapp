import {camelCase} from "lodash";

import { createMuiTheme } from "@material-ui/core/styles";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import purple from "@material-ui/core/colors/purple";
import deepPurple from "@material-ui/core/colors/deepPurple";
import indigo from "@material-ui/core/colors/indigo";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";
import cyan from "@material-ui/core/colors/cyan";
import teal from "@material-ui/core/colors/teal";
import green from "@material-ui/core/colors/green";
import lightGreen from "@material-ui/core/colors/lightGreen";
import lime from "@material-ui/core/colors/lime";
import yellow from "@material-ui/core/colors/yellow";
import amber from "@material-ui/core/colors/amber";
import orange from "@material-ui/core/colors/orange";
import deepOrange from "@material-ui/core/colors/deepOrange";
import brown from "@material-ui/core/colors/brown";
import gray from "@material-ui/core/colors/grey";
import blueGray from "@material-ui/core/colors/blueGrey";


const colors = {
  red: {
    id: "red",
    name: "Red",
    import: red
  },

  pink: {
    id: "pink",
    name: "Pink",
    import: pink
  },

  purple: {
    id: "purple",
    name: "Purple",
    import: purple
  },

  deepPurple: {
    id: "deep-purple",
    name: "Deep Purple",
    import: deepPurple
  },

  indigo: {
    id: "indigo",
    name: "Indigo",
    import: indigo
  },

  blue: {
    id: "blue",
    name: "Blue",
    import: blue
  },

  lightBlue: {
    id: "light-blue",
    name: "Light Blue",
    import: lightBlue
  },

  cyan: {
    id: "cyan",
    name: "Cyan",
    import: cyan
  },

  teal: {
    id: "teal",
    name: "Teal",
    import: teal
  },

  green: {
    id: "green",
    name: "Green",
    import: green
  },

  lightGreen: {
    id: "light-green",
    name: "Light Green",
    import: lightGreen
  },

  lime: {
    id: "lime",
    name: "Lime",
    import: lime
  },

  yellow: {
    id: "yellow",
    name: "Yellow",
    import: yellow
  },

  amber: {
    id: "amber",
    name: "Amber",
    import: amber
  },

  orange: {
    id: "orange",
    name: "Orange",
    import: orange
  },

  deepOrange: {
    id: "deep-orange",
    name: "Deep Orange",
    import: deepOrange
  },

  brown: {
    id: "brown",
    name: "Brown",
    import: brown
  },

  gray: {
    id: "gray",
    name: "Gray",
    import: gray
  },

  blueGray: {
    id: "blue-gray",
    name: "Blue Gray",
    import: blueGray
  }
};

const getColor = colorId => {
  if (!colorId) {
    return null;
  }

  colorId = camelCase(colorId);

  return colors[colorId];
};

const defaultPrimaryColor = getColor(process.env.REACT_APP_THEME_PRIMARY_COLOR);
const defaultSecondaryColor = getColor(
  process.env.REACT_APP_THEME_SECONDARY_COLOR
);
const defaultDark = process.env.REACT_APP_THEME_DARK === "true";

const defaultTheme = createMuiTheme({
  palette: {
    primary: defaultPrimaryColor.import,
    secondary: defaultSecondaryColor.import,
    type: defaultDark ? "dark" : "light"
  },

  primaryColor: defaultPrimaryColor,
  secondaryColor: defaultSecondaryColor,
  dark: defaultDark
});

const appearance = {};

appearance.colors = colors;

appearance.defaultPrimaryColor = defaultPrimaryColor;
appearance.defaultSecondaryColor = defaultSecondaryColor;
appearance.defaultDark = defaultDark;

appearance.defaultTheme = defaultTheme;

appearance.isDefaultTheme = theme => {
  if (!theme) {
    return false;
  }

  if (
    theme.primaryColor.id === defaultPrimaryColor.id &&
    theme.secondaryColor.id === defaultSecondaryColor.id &&
    theme.dark === defaultDark
  ) {
    return true;
  }

  return false;
};

appearance.createTheme = theme => {
  if (!theme) {
    return null;
  }

  let primaryColor = theme.primaryColor;
  let secondaryColor = theme.secondaryColor;
  let dark = theme.dark;

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  primaryColor = getColor(primaryColor);
  secondaryColor = getColor(secondaryColor);

  if (!primaryColor || !secondaryColor) {
    return null;
  }

  theme = createMuiTheme({
    palette: {
      primary: primaryColor.import,
      secondary: secondaryColor.import,
      type: dark ? "dark" : "light"
    },

    primaryColor: primaryColor,
    secondaryColor: secondaryColor,
    dark: dark
  });

  return theme;
};

appearance.changeTheme = theme => {
  return new Promise((resolve, reject) => {
    if (!theme) {
      reject();

      return;
    }

    let primaryColor = theme.primaryColor;
    let secondaryColor = theme.secondaryColor;
    let dark = theme.dark;

    if (!primaryColor || !secondaryColor) {
      reject();

      return;
    }

    primaryColor = getColor(primaryColor);
    secondaryColor = getColor(secondaryColor);

    if (!primaryColor || !secondaryColor) {
      reject();

      return;
    }
    
  });
};

appearance.changePrimaryColor = primaryColor => {
  return new Promise((resolve, reject) => {
    if (!primaryColor) {
      reject();

      return;
    }

    primaryColor = getColor(primaryColor);

    if (!primaryColor) {
      reject();

      return;
    }

   
  });
};

appearance.changeSecondaryColor = secondaryColor => {
  return new Promise((resolve, reject) => {
    if (!secondaryColor) {
      reject();

      return;
    }

    secondaryColor = getColor(secondaryColor);

    if (!secondaryColor) {
      reject();

      return;
    }

  });
};






export default appearance;

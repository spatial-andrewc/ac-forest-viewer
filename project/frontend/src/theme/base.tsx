export const fontFamily = [
  "Roboto",
  "Gotham Pro",
  "Monserrat",
  "Arial",
  "-apple-system",
  "BlinkMacSystemFont",
  '"Segoe UI"',
  '"Helvetica Neue"',
  "Arial",
  "sans-serif",
  '"Apple Color Emoji"',
  '"Segoe UI Emoji"',
  '"Segoe UI Symbol"',
].join(",");

const colors = {
  primary: {
    main: "#638568",
  },
  secondary: {
    main: "#007CEE",
  },
  common: {
    white: "#fff",
    black: "#000",
  }
};

const typography = {
  fontFamily,
  h1: {
    fontWeight: "medium",
    fontSize: 36,
  },
  h2: {
    fontSize: 21,
  },
  h3: {
    fontSize: 19,
    fontWeight: 600,
  },
  h4: {
    fontSize: 14,
  },
  h5: {
    fontSize: 18,
  },
  body1: {
    fontSize: 13,
    lineHeight: "18px",
  },
  body2: {
    fontSize: 21,
  },
  button: {
    fontSize: 16,
  },
};

export const base = {
  palette: colors,
  typography,
};

import { FC } from "react";
import { Box } from "@mui/material";
import { AppHeader } from "./AppHeader";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  body: {
    padding: "75px",
  },
}));

export const Layout: FC = ({ children }) => {
  const classes = useStyles();
  return (
    <>
      <AppHeader />
      <Box className={classes.body}>{children}</Box>
    </>
  );
};

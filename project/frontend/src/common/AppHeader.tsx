import { FC } from "react";
import {
  AppBar,
  Toolbar,
  Link,
  Divider,
  Box,
  Theme,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  toolBar: {
    minHeight: "80px",
    justifyContent: "center",
  },
  logo: {
    marginRight: "16px",
  },
  divider: {
    backgroundColor: theme.palette.common.white,
  },
  title: {
    marginLeft: "16px",
  },
}));


export const AppHeader: FC = () => {
  const classes = useStyles();

  return (
    <AppBar className={classes.toolBar} position="sticky" color="primary">
      <Toolbar>
        <Box className={classes.logo}>
          <Link href="https://pachama.com/" target="_blank" rel="noreferrer">
            <img src="/assets/pachama-logo.svg" alt="pachama logo" />
          </Link>
        </Box>
        <Divider
          className={classes.divider}
          orientation="vertical"
          variant="middle"
          flexItem
        />
        <Box className={classes.title}>
          <Typography variant="h5" component="div">
            {" "}
            Inventory of the world's forests{" "}
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

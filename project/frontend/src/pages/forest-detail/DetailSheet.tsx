import { FC } from "react";
import { Typography, Skeleton, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  country: {
    marginTop: "16px",
    marginBottom: "16px",
  },
}));

type DetailDataSheetProps = {
  title: string | undefined;
  forestType: string | undefined;
  country: string | undefined;
  description: string | undefined;
  isLoading: boolean | undefined;
};

/**
 * Component responsible for mapping the textual information
 * about the forest that has been selected.
 */
export const DetailSheet: FC<DetailDataSheetProps> = ({
  title,
  forestType,
  country,
  description,
  isLoading,
}) => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h1" style={{color: "#333"}}> {!isLoading ? title : <Skeleton />} </Typography>
      <Typography variant="h2" color="primary">
        {!isLoading ? forestType : <Skeleton />}
      </Typography>
      <Box className={classes.country}>
        <Typography variant="h2">
          {!isLoading ? country : <Skeleton />}
        </Typography>
      </Box>
      <Typography variant="body1" style={{ color: "#666666"}}>
        {!isLoading ? (
          description
        ) : (
          <>
            <Skeleton />
            <Skeleton />
            <Skeleton width="30%" />
          </>
        )}
      </Typography>
    </>
  );
};

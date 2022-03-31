import { FC, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Theme, Grid, Typography, Skeleton, Link } from "@mui/material";
import { ForestOverview } from "../../api/types";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: "12px",
    height: "375px",
    width: "328px",
    boxShadow: "6px 6px 8px rgba(0, 0, 0, 0.1)",
    background: "#F4F2F2",
    padding: "20px",
    cursor: "pointer",
  },
  imageContainer: {
    width: "calc(100% + 40px)",
    marginLeft: "-20px",
    height: "195px",
    marginTop: "16px",
  },
  image: {
    maxHeight: "100%",
    width: "100%",
  },
  imageSkeleton: {
    width: "calc(328px + 40px)",
    height: "195px",
    position: "absolute",
  },
  subtitle: {
    color: theme.palette.primary.main,
  },
  description: {
    marginTop: "21px",
    color: "#666666",
    textAlign: "justify",
    overflow: "hidden",
  },
  readMoreButton: {
    color: theme.palette.secondary.main,
  },
}));

type ForestTileProps = ForestOverview & { isLoading: boolean };

/**
 * A button like grid item that provides the UI for each of the
 * gallery tile items in the forest gallery.
 */
export const ForestTile: FC<ForestTileProps> = ({
  id,
  name,
  type,
  image_url,
  description,
  isLoading,
}) => {
  const classes = useStyles();

  // state to toggle the background skeleton off once the forest image has fully loaded
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <Grid item>
      <Link underline="none" href={`/${id}`}>
        <Box className={classes.root}>
          <Typography variant="h3">
            {isLoading ? <Skeleton width="80%" /> : name}
          </Typography>
          <Typography variant="h4" className={classes.subtitle}>
            {isLoading ? <Skeleton width="40%" /> : type}
          </Typography>
          <Box className={classes.imageContainer}>
            <>
              {!isImageLoaded && (
                <Box className={classes.imageSkeleton}>
                  <Skeleton width="100%" height="100%" variant="rectangular" />
                </Box>
              )}
              <img
                className={classes.image}
                src={`/assets/${image_url}.jpg`}
                alt={`image of ${name}`}
                onLoad={() => setIsImageLoaded(true)}
              />
            </>
          </Box>
          <Box className={classes.description}>
            {isLoading ? (
              <>
                <Skeleton />
                <Skeleton />
                <Skeleton width="30%" />
              </>
            ) : (
              <>
                <Typography variant="body1" display="inline">
                  {truncate(description)}
                </Typography>
                <Typography variant="body1" display="inline">
                  <Link
                    component="button"
                    color="secondary"
                    underline="none"
                    variant="body1"
                    href={`/${id}`}
                  >
                    Read more
                  </Link>
                </Typography>
              </>
            )}
          </Box>
        </Box>
      </Link>
    </Grid>
  );
};

/**
 * Helpful function to truncate the long description
 * for the gallery tiles and concatenate an elipsis.
 */
const truncate = (description: string) => {
  const wordsSplit = description.split(" ");
  if (wordsSplit.length > 35) {
    return `${wordsSplit.splice(0, 35).join(" ").trimEnd()}... `;
  } else return description;
};
